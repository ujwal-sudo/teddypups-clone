import { Sparkle } from "./icons";

// Deterministic pseudo-random positions so server and client render identically.
const rand = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export default function Stars({ count = 12, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`stars pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            left: `${(rand(i) * 96 + 2).toFixed(2)}%`,
            top: `${(rand(i + 50) * 80 + 4).toFixed(2)}%`,
            animationDelay: `${(rand(i + 99) * 3).toFixed(2)}s`,
          }}
        >
          {i % 3 === 0 ? <Sparkle className="h-3 w-3" /> : <span className="block h-1 w-1 rounded-full bg-current" />}
        </span>
      ))}
    </div>
  );
}
