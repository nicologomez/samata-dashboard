import type { Tone } from "@/types/common";
import styles from "./Sparkline.module.css";

type Props = {
  values: readonly number[];
  tone: Tone;
  label: string;
};

function smoothPath(values: readonly number[]): string {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const stepX = 110 / (values.length - 1);

  const pts = values.map((val, idx) => ({
    x: 1 + idx * stepX,
    y: 30 - ((val - min) / span) * 24,
  }));

  return pts.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = pts[idx - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");
}

/** Mini smooth trend line SVG for metric breakdown tables. */
export function Sparkline({ values, tone, label }: Props) {
  const d = smoothPath(values);

  return (
    <svg
      viewBox="0 0 112 34"
      className={`${styles.spark} ${styles[`tone-${tone}`]}`}
      role="img"
      aria-label={label}
    >
      {d && <path d={d} fill="none" />}
    </svg>
  );
}
