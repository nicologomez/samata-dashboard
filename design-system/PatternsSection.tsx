"use client";

import { useState } from "react";
import type { Metric, Period, TrendPoint } from "@/types/common";
import { HorizontalTabs } from "@/components/ui/HorizontalTabs";
import { PeriodSelect } from "@/components/ui/PeriodSelect";
import { Pill } from "@/components/ui/Pill";
import { ActionBanner } from "@/components/patterns/ActionBanner";
import { DataTable, type DataTableColumn } from "@/components/patterns/DataTable";
import { MetricCard } from "@/components/patterns/MetricCard";
import { MetricWideBlock } from "@/components/patterns/MetricWideBlock";
import { Sparkline } from "@/components/patterns/Sparkline";
import { TrendChart } from "@/components/patterns/TrendChart";
import styles from "./DesignSystemHub.module.css";

const sampleMetrics: readonly Metric[] = [
  {
    id: "m1",
    label: "Benefit Adoption",
    value: 68,
    unit: "%",
    change: 5,
    tone: "positive",
    note: "Employees enrolled",
    progress: 68,
  },
  {
    id: "m2",
    label: "Completed Sessions",
    value: 142,
    change: 12,
    tone: "positive",
    note: "Sessions this month",
  },
  {
    id: "m3",
    label: "Paused Access",
    value: 22,
    change: -1.25,
    tone: "negative",
    note: "Access currently held",
  },
  {
    id: "m4",
    label: "Avg Sessions",
    value: 1.6,
    change: 2.2,
    tone: "positive",
    note: "Per active member",
  },
];

const sampleTrend: readonly TrendPoint[] = [
  { label: "Jan", participants: 112, sessions: 34 },
  { label: "Mar", participants: 124, sessions: 42 },
  { label: "May", participants: 140, sessions: 64 },
  { label: "Jul", participants: 146, sessions: 62 },
  { label: "Sep", participants: 164, sessions: 75 },
  { label: "Dec", participants: 183, sessions: 142 },
];

type SampleRow = {
  id: string;
  item: string;
  category: string;
  count: number;
  status: "Active" | "Pending";
};

const sampleRows: readonly SampleRow[] = [
  { id: "r1", item: "Annual Subscription", category: "Billing", count: 248, status: "Active" },
  { id: "r2", item: "Okta SSO Provisioning", category: "Integrations", count: 183, status: "Active" },
  { id: "r3", item: "Gusto Directory Sync", category: "Integrations", count: 12, status: "Pending" },
];

const sampleCols: readonly DataTableColumn<SampleRow, "item" | "category" | "count" | "status">[] = [
  { key: "item", label: "Resource", width: "220px", sortable: true, sortValue: (r) => r.item },
  { key: "category", label: "Module", sortable: true, sortValue: (r) => r.category },
  { key: "count", label: "Seats", width: "140px", sortable: true, sortValue: (r) => r.count },
  { key: "status", label: "State", width: "140px", sortable: true, sortValue: (r) => r.status },
];

type Props = {
  activeCategory: string | null;
};

/** Live showcase of Composite UI & Shared Patterns (Molecules) rendered from src/components/patterns/. */
export function PatternsSection({ activeCategory }: Props) {
  const [period, setPeriod] = useState<Period>("monthly");
  const [tab, setTab] = useState("overview");

  const show = (category: string) =>
    !activeCategory || activeCategory === category;

  return (
    <div className={styles.sectionStack}>
      {show("KPI & Metric Templates") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">
              MetricCard, MetricWideBlock &amp; ActionBanner
            </h2>
            <p className="type-paragraph-small">
              Domain-agnostic summary molecules reused across Home, Analytics,
              and Employees.
            </p>
          </div>
          <div style={{ maxWidth: 320 }}>
            <MetricCard metric={sampleMetrics[0]} period="monthly" />
          </div>
          <MetricWideBlock
            heading="Workspace Overview"
            subtitle="Universal 4-column metric banner"
            metrics={sampleMetrics}
          />
          <ActionBanner
            variant="wide"
            artwork="summary"
            title="Download Employer Summary"
            description="Export aggregate performance and utilization trends."
            ctaLabel="Download Summary"
            href="/analytics"
          />
        </section>
      )}

      {show("Data Visualization") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">TrendChart &amp; Sparkline</h2>
          </div>
          <TrendChart
            data={sampleTrend}
            labelKey="label"
            series={[
              { key: "participants", label: "Active Employees", tone: "blue" },
              { key: "sessions", label: "Sessions Completed", tone: "brand" },
            ]}
            title="TrendChart"
            ariaLabel="Sample trend chart"
            showYAxis
            showArea
          />
          <div className={styles.flexWrapRow}>
            <div style={{ width: 120 }}>
              <Sparkline values={[18, 22, 19, 28, 34, 41]} tone="positive" label="Positive sparkline" />
            </div>
            <div style={{ width: 120 }}>
              <Sparkline values={[36, 32, 34, 26, 21, 18]} tone="negative" label="Negative sparkline" />
            </div>
          </div>
        </section>
      )}

      {show("Tables & Toolbars") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">
              DataTable (Select-All, Straight Chevron Sort, 48px Edges)
            </h2>
            <p className="type-paragraph-small">
              Try clicking the column headers or left checkbox to test direct
              A–Z / Z–A chevron toggling and partial dash selection.
            </p>
          </div>
          <DataTable
            tableLabel="Design system pattern sample table"
            columns={sampleCols}
            rows={sampleRows}
            getRowKey={(r) => r.id}
            getRowLabel={(r) => r.item}
            selectable
            hasRowAction
            footerSummary="Showing 1-3 of 3 Pattern Rows"
            showAllLabel="Show All"
            renderCell={(row, key) => {
              if (key === "item") return <strong className="type-label-medium-medium">{row.item}</strong>;
              if (key === "category") return row.category;
              if (key === "count") return `${row.count} synced`;
              return (
                <Pill
                  variant="display"
                  tone={row.status === "Active" ? "success" : "info"}
                  showLeftIcon
                  showRightIcon={false}
                >
                  {row.status}
                </Pill>
              );
            }}
            renderRowAction={() => (
              <span className="type-paragraph-xsmall" aria-hidden="true">
                •••
              </span>
            )}
          />
        </section>
      )}

      {show("Composite Controls") && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className="type-heading-h5">HorizontalTabs &amp; PeriodSelect</h2>
          </div>
          <div className={styles.inlineControls}>
            <HorizontalTabs
              tabs={[
                { id: "overview", label: "Employees + Sessions" },
                { id: "cohort", label: "New + Returning" },
              ]}
              value={tab}
              onChange={setTab}
            />
            <PeriodSelect
              label="Sample period selector"
              value={period}
              onChange={setPeriod}
            />
          </div>
        </section>
      )}
    </div>
  );
}
