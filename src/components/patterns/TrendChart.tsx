import { maxSeriesValue } from "@/lib/trends";
import styles from "./TrendChart.module.css";

export type TrendSeriesTone = "blue" | "brand" | "orange";

export type TrendSeries<T extends object> = {
  readonly key: keyof T & string;
  readonly label: string;
  readonly tone: TrendSeriesTone;
};

type Props<T extends object> = {
  data: readonly T[];
  labelKey: keyof T & string;
  series: readonly TrendSeries<T>[];
  title: string;
  ariaLabel: string;
  emptyMessage?: string;
};

const gridlineYs = [40, 90, 140, 190] as const;

function polylinePoints<T extends object>(
  data: readonly T[],
  key: keyof T & string,
  max: number,
): string {
  const stepCount = Math.max(1, data.length - 1);
  return data
    .map((point, index) => {
      const x = 42 + (index * 612) / stepCount;
      const value = Number(point[key]) || 0;
      const y = 213 - (value / max) * 175;
      return `${x},${y}`;
    })
    .join(" ");
}

/** Generic multi-series SVG trend line chart driven by design tokens. */
export function TrendChart<T extends object>({
  data,
  labelKey,
  series,
  title,
  ariaLabel,
  emptyMessage = "No trend data for this period.",
}: Props<T>) {
  if (data.length === 0) {
    return (
      <p role="status" className="type-paragraph-small">
        {emptyMessage}
      </p>
    );
  }

  const max = maxSeriesValue(
    data,
    series.map((item) => item.key),
  );
  const stepCount = Math.max(1, data.length - 1);

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 700 255" role="img" aria-label={ariaLabel}>
        <title>{title}</title>
        {gridlineYs.map((y) => (
          <line
            key={y}
            x1="42"
            x2="654"
            y1={y}
            y2={y}
            className={styles.gridline}
          />
        ))}
        {series.map((item) => (
          <polyline
            key={item.key}
            points={polylinePoints(data, item.key, max)}
            fill="none"
            className={`${styles.line} ${styles[`tone-${item.tone}`]}`}
          />
        ))}
        {data.map((point, index) => (
          <text
            key={`${String(point[labelKey])}-${index}`}
            x={42 + (index * 612) / stepCount}
            y="244"
            textAnchor="middle"
            className={`${styles.label} type-paragraph-xsmall`}
          >
            {String(point[labelKey])}
          </text>
        ))}
      </svg>
    </div>
  );
}
