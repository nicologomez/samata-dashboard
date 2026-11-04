import type { Period, TrendPoint } from "@/types/dashboard";
import { maxTrendValue } from "@/lib/trends";
import styles from "./ParticipationChart.module.css";

type SeriesKey = "participants" | "sessions";
function coordinates(data: readonly TrendPoint[], key: SeriesKey): string {
  const max = maxTrendValue(data);
  return data
    .map((p, index) => {
      const x = 42 + (index * 612) / Math.max(1, data.length - 1);
      const y = 213 - (p[key] / max) * 175;
      return `${x},${y}`;
    })
    .join(" ");
}

export function ParticipationChart({
  data,
  period,
}: {
  data: readonly TrendPoint[];
  period: Period;
}) {
  if (data.length === 0)
    return (
      <p role="status" className="type-paragraph-small">
        No participation data for this period.
      </p>
    );
  return (
    <div className={styles.wrap}>
      <svg
        viewBox="0 0 700 255"
        role="img"
        aria-label={`${period} active participants and completed sessions demonstration chart`}
      >
        <title>{`${period} employee participation`}</title>
        {[40, 90, 140, 190].map((y) => (
          <line
            key={y}
            x1="42"
            x2="654"
            y1={y}
            y2={y}
            className={styles.gridline}
          />
        ))}
        <polyline
          points={coordinates(data, "participants")}
          fill="none"
          className={styles.participants}
        />
        <polyline
          points={coordinates(data, "sessions")}
          fill="none"
          className={styles.sessions}
        />
        {data.map((point, index) => (
          <text
            key={point.label}
            x={42 + (index * 612) / Math.max(1, data.length - 1)}
            y="244"
            textAnchor="middle"
            className={`${styles.label} type-paragraph-xsmall`}
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
