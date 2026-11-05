"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { contactSchema, serviceOptions, type ContactData, type ContactInput } from "@/lib/contact-schema";

type Status = { kind: "idle" } | { kind: "success" } | { kind: "error"; message: string };

const field =
  "mt-2 block w-full rounded-lg border border-grey-200 bg-white px-4 py-3 text-base text-navy-900 placeholder:text-grey-500/70 transition-colors focus:border-brand-600 aria-[invalid=true]:border-red-600";
const label = "block text-sm font-semibold text-navy-900";
const errCls = "mt-1.5 text-sm text-red-700";

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", phone: "", company: "", service: defaultService, message: "", website: "" },
  });

  async function onSubmit(data: ContactData) {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: body.error ?? "Something went wrong while sending your request. Please try again or contact us directly.",
        });
        return;
      }
      setStatus({ kind: "success" });
      reset();
    } catch {
      setStatus({
        kind: "error",
        message: "We could not reach the server. Please check your connection and try again, or contact us directly.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-700" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold">Thank you – your request has been sent.</h3>
        <p className="mt-2 text-grey-700">A member of the TRT Associate team will review your enquiry and get back to you.</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 text-sm font-semibold text-brand-600 underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label="Consultation request form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={label}>Full Name <span aria-hidden="true" className="text-red-700">*</span></label>
          <input id="fullName" autoComplete="name" className={field} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-err" : undefined} {...register("fullName")} />
          {errors.fullName && <p id="fullName-err" className={errCls}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email Address <span aria-hidden="true" className="text-red-700">*</span></label>
          <input id="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} {...register("email")} />
          {errors.email && <p id="email-err" className={errCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone Number <span aria-hidden="true" className="text-red-700">*</span></label>
          <input id="phone" type="tel" autoComplete="tel" placeholder="+92 3XX XXXXXXX" className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} {...register("phone")} />
          {errors.phone && <p id="phone-err" className={errCls}>{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className={label}>Company Name <span className="font-normal text-grey-500">(optional)</span></label>
          <input id="company" autoComplete="organization" className={field} aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-err" : undefined} {...register("company")} />
          {errors.company && <p id="company-err" className={errCls}>{errors.company.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="service" className={label}>Service Required <span aria-hidden="true" className="text-red-700">*</span></label>
        <select id="service" className={field} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-err" : undefined} {...register("service")}>
          <option value="">Select a service…</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.service && <p id="service-err" className={errCls}>{errors.service.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={label}>Message <span aria-hidden="true" className="text-red-700">*</span></label>
        <textarea id="message" rows={5} className={field} placeholder="Briefly describe what you need help with." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} {...register("message")} />
        {errors.message && <p id="message-err" className={errCls}>{errors.message.message}</p>}
      </div>

      {/* Honeypot – hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status.kind === "error" && (
        <div role="alert" className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{status.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {isSubmitting ? "Sending…" : "Request Consultation"}
      </button>
      <p className="text-xs text-grey-500">
        By submitting, you agree that TRT Associate may use these details to respond to your enquiry. Please do not include
        passwords, CNIC numbers or bank details in this form.
      </p>
    </form>
  );
}
