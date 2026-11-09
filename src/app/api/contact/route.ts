import { NextResponse } from "next/server";
import { contactSchema, serviceOptions } from "@/lib/contact-schema";
import { mailConfigured, sendEnquiryEmails } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;

// Minimal in-memory rate limit (per server instance). Use a shared store
// (e.g. Redis/Upstash) or a WAF rule if deploying across many instances.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields and try again." }, { status: 422 });
  }
  const { website, ...data } = parsed.data;

  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return NextResponse.json({ ok: true });

  const serviceLabel = serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;

  // Preferred path: email the firm and send the visitor a confirmation.
  if (mailConfigured()) {
    try {
      await sendEnquiryEmails(data, serviceLabel);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("Enquiry email failed:", err instanceof Error ? err.message : err);
      return NextResponse.json(
        { error: "We could not send your message right now. Please try again shortly or contact us directly." },
        { status: 502 },
      );
    }
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    // Be honest: nothing is delivered until a destination is configured.
    return NextResponse.json(
      {
        error:
          "Online enquiries are not enabled yet, so your message was not sent. Please contact us by email, phone or WhatsApp instead.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({ ...data, serviceLabel, source: "trt-associate-website", receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact webhook failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "We could not send your message right now. Please try again shortly or contact us directly." },
      { status: 502 },
    );
  }
}
