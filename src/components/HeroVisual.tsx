/** Refined abstract financial visual (pure SVG – no network request, scales crisply). */
export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 480 420"
      role="img"
      aria-label="Abstract illustration of financial growth: rising bars with a trend line and a compliance shield"
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="bar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#8db7ee" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="440" height="380" rx="24" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.18" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="56" x2="424" y1={100 + i * 66} y2={100 + i * 66} stroke="#fff" strokeOpacity="0.12" />
      ))}
      {[
        { x: 70, h: 70 },
        { x: 140, h: 110 },
        { x: 210, h: 90 },
        { x: 280, h: 150 },
        { x: 350, h: 200 },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={340 - b.h} width="42" height={b.h} rx="6" fill="url(#bar)" />
      ))}
      <polyline
        points="91,250 161,200 231,215 301,150 371,98"
        fill="none"
        stroke="#8db7ee"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [91, 250],
        [161, 200],
        [231, 215],
        [301, 150],
        [371, 98],
      ].map(([cx, cy]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r="6" fill="#0a1f44" stroke="#fff" strokeWidth="3" />
      ))}
      <g transform="translate(330 252)">
        <rect width="120" height="120" rx="22" fill="#0b4f9e" stroke="#fff" strokeOpacity="0.35" />
        <path
          d="M60 24 94 37v24c0 22-14 38-34 45-20-7-34-23-34-45V37L60 24Z"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="m44 64 11 11 22-24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
