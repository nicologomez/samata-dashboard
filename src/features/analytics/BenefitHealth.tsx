"use client";

import { useState } from "react";
import Link from "next/link";
import type { Period, SelectOption } from "@/types/common";
import type { BenefitHealthPeriodData } from "@/types/employerAnalytics";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Select } from "@/components/ui/Select";
import { Sparkline } from "@/components/patterns/Sparkline";
import styles from "./BenefitHealth.module.css";

type Props = {
  dateRanges: readonly SelectOption[];
  byPeriod: Record<Period, BenefitHealthPeriodData>;
};

const funnelHeights = [100, 72, 50, 34, 22] as const;

/** Benefit conversion funnel and 5-row metric breakdown table. */
export function BenefitHealth({ dateRanges, byPeriod }: Props) {
  const [period, setPeriod] = useState<Period>("monthly");
  const [dateRange, setDateRange] = useState(dateRanges[0]?.value ?? "jan-jul");
  const current = byPeriod[period];
  const stageCount = current.stages.length;

  return (
    <section aria-labelledby="benefit-health-heading" className={styles.section}>
      <SectionHeader
        id="benefit-health-heading"
        icon="team"
        title="Benefit Health"
        action={
          <PeriodSelect
            label="Benefit Health period"
            value={period}
            onChange={setPeriod}
          />
        }
      />

      <div className={styles.shell}>
        {/* Top Card: Funnel */}
        <div className={styles.funnelCard}>
          <div className={styles.funnelHeader}>
            <p className="type-paragraph-small">
              Aggregate access and usage trends across your workforce.
            </p>
            <Select
              label="Benefit Health date range"
              variant="pill"
              leftIcon="calendar"
              value={dateRange}
              options={dateRanges}
              onChange={setDateRange}
            />
          </div>

          <div className={styles.funnelScroll}>
            <div className={styles.funnelStageLabels}>
              {current.stages.map((stage) => (
                <div className={styles.stageLabel} key={stage.label}>
                  <span className="type-paragraph-xsmall">{stage.label}</span>
                  <strong className="type-heading-alt-medium-h5">
                    {stage.value}
                  </strong>
                </div>
              ))}
            </div>

            <div className={styles.funnelGraphic}>
              <svg
                viewBox="0 0 770 112"
                preserveAspectRatio="none"
                className={styles.funnelSvg}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="benefit-funnel-grad"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="var(--color-blue-50)" />
                    <stop offset="35%" stopColor="var(--color-blue-200)" />
                    <stop offset="70%" stopColor="var(--color-blue-400)" />
                    <stop offset="100%" stopColor="var(--color-blue-600)" />
                  </linearGradient>
                </defs>
                {current.stages.map((stage, idx) => {
                  const colW = 770 / stageCount;
                  const gap = 3;
                  const x1 = idx * colW + (idx === 0 ? 0 : gap);
                  const x2 = (idx + 1) * colW - (idx === stageCount - 1 ? 0 : gap);
                  const hLeft = funnelHeights[idx] ?? 22;
                  const hRight =
                    idx < stageCount - 1
                      ? (funnelHeights[idx + 1] ?? 22)
                      : Math.max(16, hLeft - 6);
                  const cy = 56;
                  const y1Top = cy - hLeft / 2;
                  const y1Bot = cy + hLeft / 2;
                  const y2Top = cy - hRight / 2;
                  const y2Bot = cy + hRight / 2;

                  return (
                    <polygon
                      key={stage.label}
                      points={`${x1},${y1Top} ${x2},${y2Top} ${x2},${y2Bot} ${x1},${y1Bot}`}
                      fill="url(#benefit-funnel-grad)"
                    />
                  );
                })}
              </svg>

              <div className={styles.pillsOverlay}>
                {current.stages.slice(0, -1).map((stage, idx) => (
                  <span
                    key={stage.label}
                    style={{
                      left: `${((idx + 1) / stageCount) * 100}%`,
                    }}
                    className={`${styles.conversionPill} type-label-medium-small`}
                  >
                    <span>{stage.conversionPct}%</span>
                    <Icon name="arrow-right" size={14} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className={`${styles.footnote} type-paragraph-xsmall`}>
            Percentages show movement from the previous stage.
          </p>
        </div>

        {/* Middle Table Header */}
        <div className={`${styles.tableHeader} type-label-medium-small`}>
          <span>METRIC</span>
          <span>CURRENT</span>
          <span>CHANGE</span>
          <span>TREND</span>
          <span aria-hidden="true" />
        </div>

        {/* Bottom Rows */}
        <div className={styles.tableBody}>
          {current.rows.map((row) => (
            <div className={styles.tableRow} key={row.id}>
              <div className={styles.metricInfo}>
                <strong className="type-label-medium-medium">
                  {row.label}
                </strong>
                <span className="type-paragraph-xsmall">
                  {row.description}
                </span>
              </div>

              <span className={`${styles.currentVal} type-paragraph-small`}>
                {row.current}
              </span>

              <div className={styles.changeCell}>
                <span className="type-paragraph-small">{row.delta}</span>
                <Badge tone={row.tone === "negative" ? "error" : "success"}>
                  {Math.abs(row.changePct)}%{" "}
                  <Icon
                    name={
                      row.tone === "negative"
                        ? "arrow-down-right"
                        : "arrow-up-right"
                    }
                    size={16}
                  />
                </Badge>
              </div>

              <div className={styles.trendCell}>
                <Sparkline
                  values={row.sparkline}
                  tone={row.tone}
                  label={`${row.label} trend`}
                />
              </div>

              <Link
                href={row.href ?? "/analytics"}
                className={styles.rowLink}
                aria-label={`Inspect ${row.label}`}
              >
                <Icon name="chevron-right" size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
