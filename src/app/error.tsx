"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto max-w-2xl px-5 py-28 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-grey-500">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Try again
      </button>
    </section>
  );
}
