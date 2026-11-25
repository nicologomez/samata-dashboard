"use client";

import { useState } from "react";
import type { Period, SelectOption, TrendPoint } from "@/types/common";
import type { ParticipationTabData } from "@/types/employerAnalytics";
import { getTrendForPeriod } from "@/lib/trends";
import { HorizontalTabs } from "@/components/ui/HorizontalTabs";
import { Icon } from "@/components/ui/Icon";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Select } from "@/components/ui/Select";
import {
  TrendChart,
  type TrendSeries,
} from "@/components/patterns/TrendChart";
import styles from "./EmployeeParticipation.module.css";

const defaultSeries = [
  { key: "participants", label: "Active Participants", tone: "blue" },
  { key: "sessions", label: "Sessions Completed", tone: "brand" },
] as const satisfies readonly TrendSeries<TrendPoint>[];

type Props = {
  trendsByPeriod?: Record<Period, readonly TrendPoint[]>;
  tabs?: readonly ParticipationTabData[];
  departments?: readonly SelectOption[];
  title?: string;
  showYAxis?: boolean;
  showArea?: boolean;
};

/** Universal transparent participation trend section with optional tabs and department filter. */
export function EmployeeParticipation({
  trendsByPeriod,
  tabs,
  departments,
  title = "Employee Participation",
  showYAxis = false,
  showArea = false,
}: Props) {
  const [period, setPeriod] = useState<Period>("monthly");
  const [activeTabId, setActiveTabId] = useState<string>(tabs?.[0]?.id ?? "");
  const [department, setDepartment] = useState<string>(
    departments?.[0]?.value ?? "all",
  );

  const activeTab = tabs?.find((tab) => tab.id === activeTabId) ?? tabs?.[0];
  const resolvedTrends = activeTab?.trendsByPeriod ?? trendsByPeriod;
  const trend = resolvedTrends ? getTrendForPeriod(resolvedTrends, period) : [];
  const latest = trend.at(-1);

  const primaryLabel = activeTab?.primaryLabel ?? defaultSeries[0].label;
  const secondaryLabel = activeTab?.secondaryLabel ?? defaultSeries[1].label;
  const series = [
    { key: "participants", label: primaryLabel, tone: "blue" },
    { key: "sessions", label: secondaryLabel, tone: "brand" },
  ] as const satisfies readonly TrendSeries<TrendPoint>[];

  const hasTabs = Boolean(tabs && tabs.length > 0);

  return (
    <section
      aria-labelledby="participation-heading"
      className={styles.section}
    >
      <SectionHeader
        id="participation-heading"
        icon="bar-chart"
        title={title}
        action={
          <PeriodSelect
            label={`${title} period`}
            value={period}
            onChange={setPeriod}
          />
        }
      />

      <div className={styles.content} data-has-tabs={hasTabs}>
        {hasTabs && tabs && (
          <HorizontalTabs
            tabs={tabs.map((tab) => ({ id: tab.id, label: tab.label }))}
            value={activeTab?.id ?? ""}
            onChange={setActiveTabId}
          />
        )}

        <div className={styles.statHeader}>
          <div className={styles.statRow}>
            <div className={styles.statItem}>
              <span className="type-label-medium-medium">
                <Icon
                  name="dot"
                  size={8}
                  className={styles.participantsDot}
                />{" "}
                {primaryLabel}
              </span>
              <strong className="type-heading-alt-medium-h4">
                {latest?.participants ?? 0}
              </strong>
            </div>
            <div className={styles.statItem}>
              <span className="type-label-medium-medium">
                <Icon name="dot" size={8} className={styles.sessionsDot} />{" "}
                {secondaryLabel}
              </span>
              <strong className="type-heading-alt-medium-h4">
                {latest?.sessions ?? 0}
              </strong>
            </div>
          </div>

          {departments && departments.length > 0 && (
            <Select
              label="Filter by department"
              variant="pill"
              value={department}
              options={departments}
              onChange={setDepartment}
            />
          )}
        </div>

        <TrendChart
          data={trend}
          labelKey="label"
          series={series}
          title={`${period} ${title.toLowerCase()}`}
          ariaLabel={`${period} ${primaryLabel.toLowerCase()} and ${secondaryLabel.toLowerCase()} chart`}
          emptyMessage="No participation data for this period."
          showYAxis={showYAxis}
          showArea={showArea}
        />
      </div>
    </section>
  );
}
