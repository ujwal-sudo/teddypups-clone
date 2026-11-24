// Teddy seen from the side, built for a walk cycle (faces right; flip with CSS to face left).
// Each leg is its own group that swings from the hip/shoulder; CSS in globals.css (.walker …)
// animates legs, head bob, ear flop and tail wag only while the parent has `.is-walking`.

const FUR = "#f2be6b";
const FUR_DARK = "#e09a45";
const MUZZLE = "#fbe3b4";
const INK = "#2a170e";

function Leg({ x, y, far, cls }: { x: number; y: number; far?: boolean; cls: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={`walker-leg ${cls}`}>
        <rect x="-7.5" y="-4" width="15" height="34" rx="7.5" fill={far ? FUR_DARK : FUR} stroke={INK} strokeWidth="3" />
        <ellipse cx="2.5" cy="30" rx="10" ry="6.5" fill={far ? FUR_DARK : FUR} stroke={INK} strokeWidth="3" />
      </g>
    </g>
  );
}

type Blob = [cx: number, cy: number, rx: number, ry?: number];
const BODY: Blob[] = [
  [80, 64, 34, 22],
  [52, 62, 19],
  [108, 60, 19],
  [80, 48, 17],
  [64, 50, 13],
];
const HEAD: Blob[] = [
  [128, 38, 21],
  [114, 26, 11],
  [128, 16, 12],
  [141, 26, 10],
];

function Blobs({ items, outline, fill = FUR }: { items: Blob[]; outline: boolean; fill?: string }) {
  return (
    <>
      {items.map(([cx, cy, rx, ry], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry ?? rx} fill={fill} stroke={outline ? INK : "none"} strokeWidth={outline ? 6 : 0} />
      ))}
    </>
  );
}

export default function PupWalker({ className }: { className?: string }) {
  return (
    <svg viewBox="12 -4 160 118" className={`walker ${className ?? ""}`} aria-hidden>
      {/* far-side legs sit behind the body, a shade darker */}
      <Leg x={56} y={74} far cls="leg-b" />
      <Leg x={104} y={72} far cls="leg-a" />

      <g className="walker-tail">
        <path d="M44 56 Q34 50 32 40" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        <path d="M44 56 Q34 50 32 40" fill="none" stroke={FUR} strokeWidth="4" strokeLinecap="round" />
        <circle cx="30" cy="36" r="10" fill={FUR} stroke={INK} strokeWidth="3" />
      </g>

      <Blobs items={BODY} outline />
      <Blobs items={BODY} outline={false} />

      <Leg x={60} y={76} cls="leg-a" />
      <Leg x={100} y={74} cls="leg-b" />

      <g className="walker-head">
        {/* collar */}
        <path d="M104 46 Q110 62 120 58" fill="none" stroke="#a24a1a" strokeWidth="6" strokeLinecap="round" />
        <circle cx="113" cy="61" r="4" fill={FUR} stroke={INK} strokeWidth="2" />
        <Blobs items={HEAD} outline />
        <Blobs items={HEAD} outline={false} />
        {/* snout */}
        <ellipse cx="146" cy="45" rx="13" ry="9.5" fill={MUZZLE} stroke={INK} strokeWidth="3" />
        <ellipse cx="157" cy="42" rx="4.2" ry="3.4" fill={INK} />
        <path d="M146 51 q5 3 9 -1" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="134" cy="47" rx="5" ry="3" fill="#f7a08f" opacity="0.7" />
        <g className="pup-eyes">
          <ellipse cx="136" cy="35" rx="3.6" ry="4.3" fill={INK} />
          <circle cx="137.3" cy="33.6" r="1.3" fill="#fff" />
        </g>
        {/* floppy ear */}
        <g className="walker-ear">
          <ellipse cx="119" cy="44" rx="9.5" ry="15" fill={FUR_DARK} stroke={INK} strokeWidth="3" transform="rotate(-12 119 44)" />
        </g>
      </g>
    </svg>
  );
}
