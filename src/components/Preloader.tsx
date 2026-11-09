"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const MIN_VISIBLE_MS = 5600; // the full intro sequence plays out
const MAX_WAIT_MS = 9000; // never keep visitors waiting on a slow asset
const EXIT_MS = 2800; // curtain + page reveal duration; must outlast the last hero animation in globals.css
const COUNT_TO_MS = 5000;

const NAME = "TRT ASSOCIATE".split("");
// Fixed positions so server and client render identical markup (no hydration mismatch).
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 2 + ((i * 5) % 4),
  delay: `${((i * 0.43) % 4).toFixed(2)}s`,
  dur: `${(5 + ((i * 7) % 5)).toFixed(0)}s`,
}));

/**
 * Cinematic intro. Black letterbox bars close in, a blue light field drifts, the TRT logo is traced
 * by a ring and catches a light sweep, the name appears letter by letter and a counter climbs.
 * When the page has loaded the logo "flies through" the camera, the stage splits open along a
 * light seam and the home page settles in behind it.
 *
 * Only shown with JavaScript (`html.preloading`, set by an inline script in layout.tsx) and it
 * removes itself afterwards. The counter is decorative: it holds at 99% until the page is ready.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // React StrictMode (dev) runs effects twice: mount, cleanup, mount. Re-assert the class so the
    // simulated cleanup can never leave the overlay hidden.
    root.classList.add("preloading");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    const timers: number[] = [];
    let raf = 0;
    let finished = false;

    const setCount = (n: number) => {
      if (countRef.current) countRef.current.textContent = String(n).padStart(2, "0");
    };

    // Eased counter that never reaches 100 before the page is actually ready.
    const tick = () => {
      const t = Math.min(1, (performance.now() - started) / COUNT_TO_MS);
      setCount(Math.min(99, Math.floor(99 * (1 - Math.pow(1 - t, 3)))));
      if (!finished) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setCount(100);
      // Let the "100" register for a beat before the curtain opens.
      timers.push(
        window.setTimeout(
          () => {
            setPhase("exit");
            root.classList.remove("preloading");
            root.classList.add("is-revealing");
            timers.push(
              window.setTimeout(
                () => {
                  root.classList.remove("is-revealing");
                  setPhase("done");
                },
                reduced ? 300 : EXIT_MS,
              ),
            );
          },
          reduced ? 0 : 450,
        ),
      );
    };

    const whenReady = () => {
      const wait = Math.max(0, (reduced ? 500 : MIN_VISIBLE_MS) - (performance.now() - started));
      timers.push(window.setTimeout(finish, wait));
    };

    if (document.readyState === "complete") whenReady();
    else window.addEventListener("load", whenReady, { once: true });
    timers.push(window.setTimeout(finish, MAX_WAIT_MS));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", whenReady);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="preloader" data-phase={phase} role="status" aria-live="polite" aria-label="Loading TRT Associate">
      {/* Stage that splits open like a curtain */}
      <div className="pl-panel pl-left" aria-hidden="true" />
      <div className="pl-panel pl-right" aria-hidden="true" />

      {/* Atmosphere: drifting light, sweep and rising particles */}
      <div className="pl-atmos" aria-hidden="true">
        <span className="pl-glow pl-glow-a" />
        <span className="pl-glow pl-glow-b" />
        <span className="pl-sweep" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="pl-dot"
            style={{ left: p.left, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur }}
          />
        ))}
      </div>

      <div className="pl-center">
        <div className="pl-logo-wrap">
          <svg className="pl-ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="pl-ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1f66c4" />
                <stop offset="100%" stopColor="#d9e7f8" />
              </linearGradient>
            </defs>
            <circle className="pl-ring-track" cx="100" cy="100" r="92" />
            <circle className="pl-ring-draw" cx="100" cy="100" r="92" />
            <circle className="pl-ring-dash" cx="100" cy="100" r="98" />
          </svg>
          <div className="pl-logo-box">
            <Image src="/logo-mark-light.png" alt="" width={316} height={320} priority className="pl-logo" />
            <span className="pl-shine" aria-hidden="true" />
          </div>
        </div>

        <div className="pl-text">
          <p className="pl-name" aria-hidden="true">
            {NAME.map((ch, i) => (
              <span key={i} className="pl-letter" style={{ animationDelay: `${1.3 + i * 0.12}s` }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </p>
          <p className="pl-tag">Tax · Accounting · Compliance</p>
          <p className="pl-count" aria-hidden="true">
            <span ref={countRef}>00</span>
            <small>%</small>
          </p>
        </div>
      </div>

      <div className="pl-seam" aria-hidden="true" />
      <div className="pl-letterbox pl-lb-top" aria-hidden="true" />
      <div className="pl-letterbox pl-lb-bottom" aria-hidden="true" />
    </div>
  );
}
