import { z } from "zod";
import { services } from "./services";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "general", label: "General Enquiry / Not Sure Yet" },
] as const;

const allowedServices = serviceOptions.map((o) => o.value) as [string, ...string[]];

/** Strip control characters that have no place in a single-line field. */
const clean = (s: string) => s.replace(/[\u0000-\u001F\u007F]/g, " ").trim();

export const contactSchema = z.object({
  fullName: z.string().transform(clean).pipe(z.string().min(2, "Please enter your full name.").max(100, "Name is too long.")),
  email: z.string().transform(clean).pipe(z.email("Please enter a valid email address.").max(254)),
  phone: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .min(7, "Please enter a valid phone number.")
        .max(20, "Phone number is too long.")
        .regex(/^\+?[0-9][0-9\s\-()]{5,}$/, "Use digits, spaces, dashes or a leading +."),
    ),
  company: z.string().transform(clean).pipe(z.string().max(120, "Company name is too long.")).optional(),
  service: z.enum(allowedServices, { message: "Please select a service." }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Message must be 2000 characters or fewer."),
  /** Honeypot: real users never fill this in. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
