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
  showYAxis?: boolean;
  showArea?: boolean;
};

const ySteps = [0, 0.25, 0.5, 0.75, 1] as const;

function buildCoords<T extends object>(
  data: readonly T[],
  key: keyof T & string,
  max: number,
  xStart: number,
  plotWidth: number,
): readonly { x: number; y: number }[] {
  const stepCount = Math.max(1, data.length - 1);
  return data.map((point, index) => ({
    x: xStart + (index * plotWidth) / stepCount,
    y: 178 - ((Number(point[key]) || 0) / max) * 162,
  }));
}

function smoothPath(coords: readonly { x: number; y: number }[]): string {
  return coords.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = coords[idx - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${pt.y}, ${pt.x} ${pt.y}`;
  }, "");
}

/** Generic multi-series SVG trend chart with optional Y-axis ticks and area fill. */
export function TrendChart<T extends object>({
  data,
  labelKey,
  series,
  title,
  ariaLabel,
  emptyMessage = "No trend data for this period.",
  showYAxis = false,
  showArea = false,
}: Props<T>) {
  if (data.length === 0) {
    return (
      <p role="status" className="type-paragraph-small">
        {emptyMessage}
      </p>
    );
  }

  const rawMax = maxSeriesValue(
    data,
    series.map((item) => item.key),
  );
  const niceMax = showYAxis ? Math.ceil(rawMax / 40) * 40 : rawMax;
  const xStart = showYAxis ? 42 : 34;
  const xEnd = 768;
  const plotWidth = xEnd - xStart;
  const stepCount = Math.max(1, data.length - 1);

  const primary = series[0];
  const primaryCoords = primary
    ? buildCoords(data, primary.key, niceMax, xStart, plotWidth)
    : [];
  const primaryPath = smoothPath(primaryCoords);
  const areaPath =
    showArea && primaryCoords.length > 1
      ? `${primaryPath} L ${primaryCoords[primaryCoords.length - 1].x} 178 L ${primaryCoords[0].x} 178 Z`
      : "";

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 786 208" role="img" aria-label={ariaLabel}>
        <title>{title}</title>
        <defs>
          <linearGradient id="trend-area-blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-100)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--color-blue-50)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ySteps.map((ratio) => {
          const y = 178 - ratio * 162;
          const tickVal = Math.round(niceMax * ratio);
          return (
            <g key={ratio}>
              <line
                x1={xStart}
                x2={xEnd}
                y1={y}
                y2={y}
                className={styles.gridline}
              />
              {showYAxis && (
                <text
                  x={xStart - 10}
                  y={y + 4}
                  textAnchor="end"
                  className={`${styles.axisLabel} type-paragraph-xsmall`}
                >
                  {tickVal}
                </text>
              )}
            </g>
          );
        })}

        {areaPath && <path d={areaPath} fill="url(#trend-area-blue)" />}

        {series.map((item) => {
          const coords = buildCoords(data, item.key, niceMax, xStart, plotWidth);
          return (
            <path
              key={item.key}
              d={smoothPath(coords)}
              fill="none"
              className={`${styles.line} ${styles[`tone-${item.tone}`]}`}
            />
          );
        })}

        {data.map((point, index) => (
          <text
            key={`${String(point[labelKey])}-${index}`}
            x={xStart + (index * plotWidth) / stepCount}
            y="200"
            textAnchor="middle"
            className={`${styles.axisLabel} type-paragraph-xsmall`}
          >
            {String(point[labelKey])}
          </text>
        ))}
      </svg>
    </div>
  );
}
