# TRT Associate – Website

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · React Hook Form + Zod · Lucide icons.

## Run locally
```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

## Quality checks / production
```bash
npm run typecheck && npm run lint
npm run build && npm start
```

## Pages
| URL | Purpose |
|---|---|
| `/` | Home (hero, about, services, why us, process, CTA) |
| `/income-sales-tax` | Income & Sales Tax service page |
| `/secp-compliance-incorporation` | SECP service page |
| `/financial-accounting-auditing` | Accounting & Auditing service page |
| `/risk-management-compliance` | Risk Management service page |
| `/contact` | Consultation form + contact details |

Also: `/sitemap.xml`, `/robots.txt`, `/api/contact`.

## Configuration (`.env.local`)
- `NEXT_PUBLIC_SITE_URL` – **required for production** (canonical URLs, sitemap, Open Graph).
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits with country code, e.g. `923001234567`), `NEXT_PUBLIC_OFFICE_ADDRESS` – until set, visible placeholders are shown and the WhatsApp button is hidden.
- `CONTACT_WEBHOOK_URL` (+ optional `CONTACT_WEBHOOK_TOKEN`) – where `/api/contact` forwards validated enquiries as JSON. **Until set, the API returns 503 and the form tells visitors the message was not sent** (no fake success).
- Social links: edit `company.social` in `src/lib/site.ts`.

## Editing content
- Company data: `src/lib/site.ts`
- All service-page copy, FAQs, SEO titles: `src/lib/services.ts`
- Design tokens (colours, fonts, shadows): `src/app/globals.css`
- Logo: `src/components/Logo.tsx`, `public/logo.svg`, favicon `src/app/icon.svg`

## Deployment
Deploy to Vercel (import repo, set env vars) or any Node host: `npm run build && npm start`.
Before launch: set real contact details and `NEXT_PUBLIC_SITE_URL`, connect a webhook/email backend, verify every statutory statement against FBR / SECP / SRB sources, and add a Privacy Policy page.
The in-memory rate limiter in `/api/contact` is per-instance; use a shared store or WAF for multi-instance deployments.
