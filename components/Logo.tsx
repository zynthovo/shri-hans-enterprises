// Inline SVG monogram — avoids a raster brand asset that would need
// regenerating whenever the business name changes.
export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Shri Hans Enterprises"
    >
      <rect width="48" height="48" rx="10" fill="#0a0908" />
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="9"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.5"
      />
      <path
        d="M14 34 L24 14 L34 34 M18.5 25 H29.5"
        fill="none"
        stroke="#d4af37"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
