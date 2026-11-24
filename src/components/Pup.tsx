// Teddy, the cartoon poodle mascot. Hand-drawn SVG so it stays crisp and animatable.
// Fluffy outline trick: draw every blob with a thick stroke, then redraw them without
// a stroke on top, so only the outer edge of the silhouette keeps its outline.

const FUR = "#f2be6b";
const FUR_DARK = "#e09a45";
const INK = "#2a170e";

type Blob = { cx: number; cy: number; r?: number; rx?: number; ry?: number; fill?: string; className?: string };

const HEAD: Blob[] = [
  { cx: 60, cy: 50, r: 28 },
  { cx: 40, cy: 40, r: 12 },
  { cx: 80, cy: 40, r: 12 },
  { cx: 60, cy: 24, r: 13 },
  { cx: 50, cy: 18, r: 8 },
  { cx: 70, cy: 18, r: 8 },
  { cx: 60, cy: 11, r: 8 },
];
const EARS: Blob[] = [
  { cx: 33, cy: 60, rx: 11, ry: 18, fill: FUR_DARK, className: "pup-ear-l" },
  { cx: 87, cy: 60, rx: 11, ry: 18, fill: FUR_DARK, className: "pup-ear-r" },
];
const BODY: Blob[] = [
  { cx: 60, cy: 96, r: 25 },
  { cx: 45, cy: 104, r: 15 },
  { cx: 75, cy: 104, r: 15 },
  { cx: 48, cy: 121, rx: 10, ry: 8 },
  { cx: 72, cy: 121, rx: 10, ry: 8 },
];
const PAWS: Blob[] = [
  { cx: 44, cy: 80, rx: 10, ry: 8 },
  { cx: 76, cy: 80, rx: 10, ry: 8 },
];

function Blobs({ items, outline }: { items: Blob[]; outline: boolean }) {
  return (
    <>
      {items.map((b, i) => {
        const p = {
          fill: b.fill ?? FUR,
          stroke: outline ? INK : "none",
          strokeWidth: outline ? 6 : 0,
          className: b.className,
        };
        return b.r ? (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} {...p} />
        ) : (
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} {...p} />
        );
      })}
    </>
  );
}

function Face() {
  return (
    <g>
      <ellipse cx="60" cy="61" rx="13" ry="10" fill="#fbe3b4" />
      <ellipse cx="43" cy="59" rx="5.5" ry="3.2" fill="#f7a08f" opacity="0.7" />
      <ellipse cx="77" cy="59" rx="5.5" ry="3.2" fill="#f7a08f" opacity="0.7" />
      <g className="pup-eyes">
        <ellipse cx="50" cy="50" rx="4" ry="4.6" fill={INK} />
        <ellipse cx="70" cy="50" rx="4" ry="4.6" fill={INK} />
        <circle cx="51.4" cy="48.4" r="1.4" fill="#fff" />
        <circle cx="71.4" cy="48.4" r="1.4" fill="#fff" />
      </g>
      <ellipse cx="60" cy="57.5" rx="3.6" ry="2.7" fill={INK} />
      <path d="M55.5 61.5q4.5 4.5 9 0" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

type Props = { pose?: "sit" | "peek"; className?: string; title?: string; collar?: boolean };

export default function Pup({ pose = "sit", className, title, collar = true }: Props) {
  const label = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };

  if (pose === "peek") {
    return (
      <svg viewBox="16 -2 88 92" className={className} {...label}>
        <Blobs items={EARS} outline />
        <Blobs items={EARS} outline={false} />
        <Blobs items={HEAD} outline />
        <Blobs items={HEAD} outline={false} />
        <Face />
        <Blobs items={PAWS} outline />
        <Blobs items={PAWS} outline={false} />
        <path d="M40 80.5h3M73 80.5h3" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="10 -2 104 134" className={className} {...label}>
      <g className="pup-bob">
        <g className="pup-tail">
          <circle cx="92" cy="104" r="10" fill={FUR} stroke={INK} strokeWidth="3" />
        </g>
        <Blobs items={BODY} outline />
        <Blobs items={BODY} outline={false} />
        <Blobs items={EARS} outline />
        <Blobs items={EARS} outline={false} />
        <Blobs items={HEAD} outline />
        <Blobs items={HEAD} outline={false} />
        <path d="M48 126v-5M72 126v-5" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        {collar && (
          <g>
            <path d="M42 76q18 10 36 0" fill="none" stroke="#a24a1a" strokeWidth="5" strokeLinecap="round" />
            <circle cx="60" cy="84" r="4.5" fill="#f2be6b" stroke={INK} strokeWidth="2" />
          </g>
        )}
        <Face />
      </g>
    </svg>
  );
}
