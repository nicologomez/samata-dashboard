"use client";

import type { IntegrationLogEntry } from "@/types/employerIntegrations";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { useActivityLog } from "./ActivityLogContext";
import styles from "./LatestLogPanel.module.css";

type Props = {
  log?: IntegrationLogEntry;
};

/** Right-rail inspector showing metadata and employee delta rows for the selected log. */
export function LatestLogPanel({ log: propLog }: Props) {
  const { selectedLog } = useActivityLog();
  const entry = propLog ?? selectedLog;

  if (!entry) return null;

  return (
    <section aria-labelledby="latest-log-heading" className={styles.section}>
      <SectionHeader id="latest-log-heading" icon="grid" title="Latest Log" />

      <Card
        surface="default"
        padding="none"
        elevation="xs"
        glow
        className={styles.card}
      >
        <div className={styles.summary}>
          <h3 className={`${styles.panelTitle} type-label-medium-medium`}>
            Sync Log Details
          </h3>

          <div className={styles.metaGrid}>
            <div className={styles.metaBlock}>
              <span className={`${styles.metaLabel} type-label-medium-xsmall`}>
                DATE &amp; TIME
              </span>
              <span className={`${styles.metaValue} type-label-medium-medium`}>
                {entry.dateLabel}
              </span>
              <span className={`${styles.metaSub} type-paragraph-xsmall`}>
                {entry.timeLabel}
              </span>
            </div>

            <div className={styles.metaBlock}>
              <span className={`${styles.metaLabel} type-label-medium-xsmall`}>
                TYPE
              </span>
              <span className={`${styles.metaValue} type-label-medium-medium`}>
                {entry.type}
              </span>
              <span className={`${styles.metaSub} type-paragraph-xsmall`}>
                {entry.timeLabel}
              </span>
            </div>
          </div>

          <div className={styles.statusBox}>
            <Icon
              name="check-circle"
              size={16}
              className={
                entry.trendTone === "warning"
                  ? styles.warningIcon
                  : styles.successIcon
              }
            />
            <div className={styles.statusText}>
              <span className={`${styles.metaValue} type-label-medium-medium`}>
                {entry.statusSummaryTitle}
              </span>
              <span className={`${styles.metaSub} type-paragraph-xsmall`}>
                {entry.statusSummaryDetail}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.detailsDock}>
          <div className={styles.detailsHeader}>
            <span className={`${styles.metaLabel} type-label-medium-xsmall`}>
              EMPLOYEE
            </span>
            <span
              className={`${styles.metaLabel} ${styles.detailsCol} type-label-medium-xsmall`}
            >
              DETAILS
            </span>
          </div>

          <div className={styles.deltaList}>
            {entry.employeeDeltas.length > 0 ? (
              entry.employeeDeltas.map((delta) => (
                <div key={delta.id} className={styles.deltaRow}>
                  <div className={styles.deltaEmployee}>
                    <span className={`${styles.deltaName} type-paragraph-small`}>
                      {delta.name}
                    </span>
                    <span className={`${styles.metaSub} type-paragraph-xsmall`}>
                      {delta.employmentType}
                    </span>
                  </div>
                  <div className={styles.deltaBadgeCol}>
                    <Pill variant="display" tone={delta.tone}>
                      {delta.changeLabel}
                    </Pill>
                  </div>
                </div>
              ))
            ) : (
              <p className={`${styles.emptyDeltas} type-paragraph-xsmall`}>
                No employee roster additions or removals in this event.
              </p>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
