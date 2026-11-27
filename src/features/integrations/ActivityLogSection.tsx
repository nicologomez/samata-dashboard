"use client";

import type {
  ActivityLogFilter,
  IntegrationLogEntry,
} from "@/types/employerIntegrations";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { useActivityLog } from "./ActivityLogContext";
import styles from "./ActivityLogSection.module.css";

const filters: readonly { id: ActivityLogFilter; label: string }[] = [
  { id: "hris", label: "HRIS Sync" },
  { id: "sso", label: "SSO Activity" },
  { id: "api", label: "API Events" },
];

type Props = {
  logs?: readonly IntegrationLogEntry[];
};

/** Filterable integration activity log table linked to Latest Log detail preview. */
export function ActivityLogSection({ logs: propLogs }: Props) {
  const {
    activeFilter,
    filteredLogs,
    selectedLog,
    setActiveFilter,
    setSelectedLogId,
  } = useActivityLog();

  const rows = propLogs
    ? propLogs.filter((entry) => entry.category === activeFilter)
    : filteredLogs;

  return (
    <section
      id="activity-log"
      aria-labelledby="activity-log-heading"
      className={styles.section}
    >
      <SectionHeader
        id="activity-log-heading"
        icon="doc-fill"
        title="Activity Log"
      />

      <Card surface="default" padding="none" elevation="xs" className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Log stream">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant="pills"
                size="xs"
                state={activeFilter === filter.id ? "pressed" : undefined}
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <Button
            variant="basic"
            state="transparent"
            mode="icon"
            size="xs"
            leftIcon="three-dot"
            aria-label="Activity log actions"
          />
        </div>

        <div className={styles.tableScroll}>
          <div
            className={styles.table}
            role="table"
            aria-label="Activity log entries"
          >
            <div className={styles.headerRow} role="row">
              <div
                className={`${styles.th} type-label-medium-xsmall`}
                role="columnheader"
              >
                DATE &amp; TIME
              </div>
              <div
                className={`${styles.th} type-label-medium-xsmall`}
                role="columnheader"
              >
                TYPE
              </div>
              <div
                className={`${styles.th} type-label-medium-xsmall`}
                role="columnheader"
              >
                RECORDS
              </div>
              <div
                className={`${styles.th} type-label-medium-xsmall`}
                role="columnheader"
              >
                CHANGES
              </div>
              <div
                className={`${styles.th} type-label-medium-xsmall`}
                role="columnheader"
              >
                TREND
              </div>
              <div
                className={styles.th}
                role="columnheader"
                aria-label="Inspect"
              />
            </div>

            <div className={styles.tbody} role="rowgroup">
              {rows.map((row) => {
                const isSelected = row.id === selectedLog?.id;
                return (
                  <div
                    key={row.id}
                    role="row"
                    data-selected={isSelected ? "true" : "false"}
                    className={styles.bodyRow}
                    onClick={() => setSelectedLogId(row.id)}
                  >
                    <div
                      className={`${styles.td} type-paragraph-small`}
                      role="cell"
                    >
                      <span className={styles.cellText}>
                        {row.dateLabel} · {row.timeLabel}
                      </span>
                    </div>
                    <div
                      className={`${styles.td} type-paragraph-small`}
                      role="cell"
                    >
                      {row.type}
                    </div>
                    <div
                      className={`${styles.td} type-paragraph-small`}
                      role="cell"
                    >
                      <span className={styles.numeric}>{row.recordsCount}</span>
                    </div>
                    <div
                      className={`${styles.td} type-paragraph-small`}
                      role="cell"
                    >
                      <span className={styles.cellText}>
                        {row.changesSummary}
                      </span>
                    </div>
                    <div className={styles.td} role="cell">
                      <Pill variant="display" tone={row.trendTone}>
                        {row.trendLabel}
                      </Pill>
                    </div>
                    <div className={styles.actionCell} role="cell">
                      <Button
                        variant="basic"
                        state="transparent"
                        mode="icon"
                        size="xs"
                        leftIcon="chevron-right"
                        aria-label={`Inspect ${row.dateLabel} ${row.timeLabel} log`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedLogId(row.id);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
