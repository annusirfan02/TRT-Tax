import nodemailer from "nodemailer";
import { company } from "./site";
import type { ContactData } from "./contact-schema";

/** Email is enabled only when SMTP credentials are configured. */
export function mailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function transporter() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

/**
 * Sends (1) a notification to the TRT Associate inbox and (2) a confirmation to the visitor.
 * The notification is the one that matters: if it fails this throws. A failed confirmation is
 * logged but does not fail the request, because the enquiry has already reached the firm.
 */
export async function sendEnquiryEmails(data: ContactData, serviceLabel: string) {
  const tx = transporter();
  const from = process.env.MAIL_FROM ?? `${company.name} <${process.env.SMTP_USER}>`;
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL ?? company.email;
  if (!notifyTo) throw new Error("No notification address configured (CONTACT_NOTIFY_EMAIL).");

  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company || "—"],
    ["Service", serviceLabel],
  ];

  await tx.sendMail({
    from,
    to: notifyTo,
    replyTo: { name: data.fullName, address: data.email },
    subject: `New website enquiry: ${serviceLabel} – ${data.fullName}`,
    text: [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", data.message].join("\n"),
    html: `<h2 style="font-family:Arial,sans-serif;color:#0a1f44">New website enquiry</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5b6678"><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}
</table>
<p style="font-family:Arial,sans-serif;font-size:14px"><b>Message</b></p>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(data.message)}</p>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#5b6678">Reply to this email to respond to the visitor directly.</p>`,
  });

  try {
    const contact = [company.phones.join(" / "), company.email].filter(Boolean).join(" | ");
    await tx.sendMail({
      from,
      to: data.email,
      replyTo: notifyTo,
      subject: `We received your enquiry – ${company.name}`,
      text: `Dear ${data.fullName},

Thank you for contacting ${company.name}. We have received your enquiry about "${serviceLabel}" and a member of our team will review it and get back to you.

Your message:
${data.message}

If your matter is urgent, you can reach us on ${contact}.

Kind regards,
${company.name}
${company.address ?? ""}, ${company.city}, ${company.country}

This is an automated confirmation. Please do not send passwords, CNIC numbers or bank details by email.`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#364152;max-width:560px">
<h2 style="color:#0a1f44">Thank you, ${esc(data.fullName)}</h2>
<p>We have received your enquiry about <b>${esc(serviceLabel)}</b> and a member of our team will review it and get back to you.</p>
<p style="margin-bottom:4px"><b>Your message</b></p>
<p style="white-space:pre-wrap;background:#f1f3f6;padding:12px;border-radius:8px">${esc(data.message)}</p>
<p>If your matter is urgent, you can reach us on ${esc(contact)}.</p>
<p>Kind regards,<br><b>${esc(company.name)}</b><br>${esc(`${company.address ?? ""}, ${company.city}, ${company.country}`)}</p>
<p style="font-size:12px;color:#5b6678">This is an automated confirmation. Please do not send passwords, CNIC numbers or bank details by email.</p>
</div>`,
    });
  } catch (err) {
    console.error("Confirmation email failed:", err instanceof Error ? err.message : err);
  }
}
