"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq as FaqType } from "@/lib/services";

export function FaqList({ faqs }: { faqs: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="divide-y divide-grey-200 rounded-2xl border border-grey-200 bg-white shadow-card">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-navy-900 transition-colors hover:text-brand-600 sm:px-7"
              >
                {f.q}
                <Plus
                  className={`h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`${uid}-a${i}`}
              role="region"
              aria-labelledby={`${uid}-q${i}`}
              hidden={!isOpen}
              className="px-5 pb-6 text-[0.95rem] leading-relaxed text-grey-500 sm:px-7"
            >
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
