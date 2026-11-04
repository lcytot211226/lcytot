// LCYTOT logo: a terminal-style wordmark.
// - gradient ">" prompt in front
// - monoline letters in currentColor (follows the theme)
// - the L's foot runs under the whole word as a baseline
// - a blinking gradient cursor at the end of the baseline
// Strokes "draw themselves" on load (.logo-draw / .logo-cursor in globals.css).

const STROKES = [
  "M2 2V26H124", // L, with its foot extended into the baseline
  "M37.07 4.93A10 10 0 1 0 37.07 19.07", // C
  "M44 2L51 12L58 2M51 12V22", // Y
  "M64 2H78M71 2V22", // T
  "M94 2A10 10 0 1 1 93.99 2", // O
  "M110 2H124M117 2V22", // T
];

const GRAD_ID = "lcytot-logo-grad";

export default function Logo({ className = "h-6 w-auto sm:h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 157 28"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="LCYTOT"
    >
      <defs>
        <linearGradient id={GRAD_ID} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#799ef6" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* prompt */}
      <path d="M2 5L9 12L2 19" stroke={`url(#${GRAD_ID})`} strokeWidth="2.5" />

      <g transform="translate(21 0)" strokeWidth="2.25">
        {STROKES.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className="logo-draw"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </g>

      {/* cursor */}
      <rect
        x="149"
        y="24.75"
        width="7"
        height="2.5"
        rx="1"
        fill={`url(#${GRAD_ID})`}
        stroke="none"
        className="logo-cursor"
      />
    </svg>
  );
}
