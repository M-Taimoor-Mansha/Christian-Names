export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
      aria-hidden
    >
      <span className="h-px w-16 bg-gold/70" />
      <svg
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M7 1v16M2 6h10" />
      </svg>
      <span className="h-px w-16 bg-gold/70" />
    </div>
  );
}
