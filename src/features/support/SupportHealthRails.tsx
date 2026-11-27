import type {
  AccountHealthRow,
  SystemServiceStatus,
} from "@/types/employerSupport";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./SupportHealthRails.module.css";

type StatusProps = {
  statuses: readonly SystemServiceStatus[];
  lastCheckedLabel: string;
};

/** Right-rail live platform availability status panel. */
export function StatusHealthPanel({ statuses, lastCheckedLabel }: StatusProps) {
  return (
    <section
      id="status-health"
      aria-labelledby="status-health-heading"
      className={styles.section}
    >
      <SectionHeader
        id="status-health-heading"
        icon="gantt-chart"
        title="Status & Health"
      />

      <Card
        surface="default"
        padding="none"
        elevation="xs"
        glow
        className={styles.card}
      >
        <ul className={styles.list}>
          {statuses.map((service) => (
            <li key={service.id} className={styles.item}>
              <strong className={`${styles.itemTitle} type-label-medium-medium`}>
                {service.name}
              </strong>
              <span
                className={`${styles.statusRow} type-paragraph-small`}
                data-tone={service.tone}
              >
                <Icon name="dot-small" size={16} className={styles.dot} />
                <span>{service.statusLabel}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className={`${styles.footerNote} type-paragraph-xsmall`}>
          {lastCheckedLabel}
        </p>
      </Card>
    </section>
  );
}

type AccountProps = {
  rows: readonly AccountHealthRow[];
};

/** Right-rail SLA, billing, and active support metrics card. */
export function AccountHealthPanel({ rows }: AccountProps) {
  return (
    <section aria-labelledby="account-health-heading" className={styles.section}>
      <SectionHeader
        id="account-health-heading"
        icon="gantt-chart"
        title="Account Health"
      />

      <Card
        surface="default"
        padding="none"
        elevation="xs"
        glow
        className={styles.card}
      >
        <ul className={styles.list}>
          {rows.map((row) => (
            <li key={row.id} className={styles.item}>
              <strong className={`${styles.itemTitle} type-label-medium-medium`}>
                {row.label}
              </strong>
              <span
                className={`${styles.statusRow} type-paragraph-small`}
                data-tone={row.dotTone}
              >
                {row.dotTone && (
                  <Icon name="dot-small" size={16} className={styles.dot} />
                )}
                <span>{row.value}</span>
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
