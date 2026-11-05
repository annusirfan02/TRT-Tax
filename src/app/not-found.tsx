import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Error 404</p>
      <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-grey-500">The page you are looking for may have moved or no longer exists.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Contact Us</ButtonLink>
      </div>
    </section>
  );
}
