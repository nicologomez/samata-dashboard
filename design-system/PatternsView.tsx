"use client";

import { useState } from "react";
import type { Metric, Period, TrendPoint } from "@/types/common";
import { HorizontalTabs } from "@/components/ui/HorizontalTabs";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { Pill } from "@/components/ui/Pill";
import { ActionBanner } from "@/components/patterns/ActionBanner";
import { DataTable, type DataTableColumn } from "@/components/patterns/DataTable";
import { MetricCard } from "@/components/patterns/MetricCard";
import { MetricStrip } from "@/components/patterns/MetricStrip";
import { MetricWideBlock } from "@/components/patterns/MetricWideBlock";
import { Sparkline } from "@/components/patterns/Sparkline";
import { TrendChart } from "@/components/patterns/TrendChart";
import styles from "./DesignSystemHub.module.css";

const demoMetrics: readonly Metric[] = [
  {
    id: "pm1",
    label: "Benefit Adoption",
    value: 68,
    unit: "%",
    change: 5,
    tone: "positive",
    note: "194 of 300 eligible enrolled",
    progress: 68,
  },
  {
    id: "pm2",
    label: "Completed Sessions",
    value: 142,
    change: 12,
    tone: "positive",
    note: "Sessions this month",
  },
  {
    id: "pm3",
    label: "Coverage Utilization",
    value: 79,
    unit: "%",
    change: -1.25,
    tone: "negative",
    note: "Plan usage rate",
  },
  {
    id: "pm4",
    label: "Avg Sessions",
    value: 1.6,
    change: 2.2,
    tone: "positive",
    note: "Sessions per employee",
  },
];

const demoTrend: readonly TrendPoint[] = [
  { label: "Jan", participants: 112, sessions: 34 },
  { label: "Mar", participants: 124, sessions: 42 },
  { label: "May", participants: 140, sessions: 64 },
  { label: "Jul", participants: 146, sessions: 62 },
  { label: "Sep", participants: 164, sessions: 75 },
  { label: "Dec", participants: 183, sessions: 142 },
];

type DemoRow = {
  id: string;
  name: string;
  module: string;
  seats: number;
  state: "Active" | "Pending";
};

const demoRows: readonly DemoRow[] = [
  { id: "d1", name: "Annual Growth Plan", module: "Billing", seats: 248, state: "Active" },
  { id: "d2", name: "Okta SCIM Sync", module: "Integrations", seats: 183, state: "Active" },
  { id: "d3", name: "Rippling Directory", module: "Integrations", seats: 12, state: "Pending" },
];

const demoCols: readonly DataTableColumn<
  DemoRow,
  "name" | "module" | "seats" | "state"
>[] = [
  { key: "name", label: "Resource", width: "220px", sortable: true, sortValue: (r) => r.name },
  { key: "module", label: "Module", sortable: true, sortValue: (r) => r.module },
  { key: "seats", label: "Seats", width: "140px", sortable: true, sortValue: (r) => r.seats },
  { key: "state", label: "State", width: "140px", sortable: true, sortValue: (r) => r.state },
];

type Props = {
  itemId: string;
};

/** Renders individual single-subject specimen pages for each Molecule / Pattern. */
export function PatternsView({ itemId }: Props) {
  const [period, setPeriod] = useState<Period>("monthly");
  const [tab, setTab] = useState("employees-sessions");

  switch (itemId) {
    case "m-actionbanner":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            ActionBanner Variants (compact &amp; wide)
          </h3>
          <div className={styles.canvasLight}>
            <div style={{ maxWidth: 270 }}>
              <ActionBanner
                variant="compact"
                artwork="flower"
                title="Promote Availability"
                description="Share available booking windows with eligible employees."
                ctaLabel="Send Reminder"
                href="/employees"
              />
            </div>
            <ActionBanner
              variant="wide"
              artwork="summary"
              title="Download Employer Summary"
              description="Export aggregate benefit performance for internal reporting."
              ctaLabel="Download Summary"
              href="/analytics"
            />
          </div>
        </div>
      );

    case "m-datatable":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            DataTable — Select-All / Dash &amp; Direct Chevron Sort
          </h3>
          <DataTable
            tableLabel="Sample resource table"
            columns={demoCols}
            rows={demoRows}
            getRowKey={(r) => r.id}
            getRowLabel={(r) => r.name}
            selectable
            hasRowAction
            footerSummary="Showing 1-3 of 3 Items"
            showAllLabel="Show All"
            renderCell={(row, key) => {
              if (key === "name") {
                return <strong className="type-label-medium-medium">{row.name}</strong>;
              }
              if (key === "module") return row.module;
              if (key === "seats") return `${row.seats} seats`;
              return (
                <Pill
                  variant="display"
                  tone={row.state === "Active" ? "success" : "info"}
                  showLeftIcon
                  showRightIcon={false}
                >
                  {row.state}
                </Pill>
              );
            }}
            renderRowAction={() => (
              <span className="type-paragraph-xsmall" aria-hidden="true">
                •••
              </span>
            )}
          />
        </div>
      );

    case "m-horizontaltabs":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            HorizontalTabs (Keyboard Arrow Navigation)
          </h3>
          <div className={styles.canvasLight}>
            <HorizontalTabs
              tabs={[
                { id: "employees-sessions", label: "Employees + Sessions" },
                { id: "new-returning", label: "New + Returning" },
              ]}
              value={tab}
              onChange={setTab}
            />
            <p className="type-paragraph-xsmall">
              Active tab id: <code>{tab}</code>
            </p>
          </div>
        </div>
      );

    case "m-metriccard":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            MetricCard — Single KPI Specimen
          </h3>
          <div className={styles.canvasLight}>
            <div style={{ maxWidth: 320 }}>
              <MetricCard metric={demoMetrics[0]} period="monthly" />
            </div>
          </div>
        </div>
      );

    case "m-metricstrip":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            MetricStrip — 3-Column KPI Grid
          </h3>
          <div className={styles.canvasLight}>
            <MetricStrip metrics={demoMetrics.slice(0, 3)} period="monthly" />
          </div>
        </div>
      );

    case "m-metricwideblock":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            MetricWideBlock — 4-Column Gradient Banner (32px Gap)
          </h3>
          <div className={styles.canvasLight}>
            <MetricWideBlock
              heading="TrilumenAI"
              subtitle="Manage eligibility, onboarding status, and session"
              metrics={demoMetrics}
            />
          </div>
        </div>
      );

    case "m-periodselect":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            PeriodSelect — Interactive Selector
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <PeriodSelect
                label="Interactive period select"
                value={period}
                onChange={setPeriod}
              />
              <code className="type-paragraph-xsmall">
                Selected period: {period}
              </code>
            </div>
          </div>
        </div>
      );

    case "m-sparkline":
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            Sparkline — Positive, Negative &amp; Neutral Tones
          </h3>
          <div className={styles.canvasLight}>
            <div className={styles.flexWrap}>
              <div style={{ width: 124 }}>
                <Sparkline
                  values={[14, 18, 17, 25, 29, 38]}
                  tone="positive"
                  label="Positive sparkline"
                />
                <span className="type-paragraph-xsmall">positive</span>
              </div>
              <div style={{ width: 124 }}>
                <Sparkline
                  values={[38, 30, 31, 22, 19, 14]}
                  tone="negative"
                  label="Negative sparkline"
                />
                <span className="type-paragraph-xsmall">negative</span>
              </div>
              <div style={{ width: 124 }}>
                <Sparkline
                  values={[20, 22, 21, 20, 21, 22]}
                  tone="neutral"
                  label="Neutral sparkline"
                />
                <span className="type-paragraph-xsmall">neutral</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={styles.stage}>
          <h3 className={`${styles.stageSubhead} type-heading-h6`}>
            TrendChart — Minimal (Home) vs. Y-Axis + Area Fill (Analytics)
          </h3>
          <div className={styles.canvasLight}>
            <TrendChart
              data={demoTrend}
              labelKey="label"
              series={[
                { key: "participants", label: "Active Employees", tone: "blue" },
                { key: "sessions", label: "Sessions Completed", tone: "brand" },
              ]}
              title="Detailed Trend Chart"
              ariaLabel="TrendChart with Y-axis and area fill"
              showYAxis
              showArea
            />
          </div>
        </div>
      );
  }
}
