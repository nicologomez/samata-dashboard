import type { AccessSummaryData } from "@/types/employerEmployees";
import { careStatusIcons } from "@/lib/care";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./AccessSummary.module.css";

type Props = {
  data: AccessSummaryData;
};

/** Compact access lifecycle breakdown panel paired beside At a Glance on /employees. */
export function AccessSummary({ data }: Props) {
  return (
    <section
      aria-labelledby="access-summary-heading"
      className={styles.section}
    >
      <SectionHeader
        id="access-summary-heading"
        icon="gantt-chart"
        title="Access Summary"
      />

      <Card surface="default" glow elevation="xs" className={styles.card}>
        <ul className={styles.timeline}>
          {data.care.map((item) => (
            <li key={item.label} className={styles.row}>
              <span className={styles.iconCircle} aria-hidden="true">
                <Icon
                  name={careStatusIcons[item.label] ?? "hourglass"}
                  size={12}
                />
              </span>
              <strong className={`${styles.count} type-heading-alt-italic-h6`}>
                {item.count}
              </strong>
              <span className={`${styles.label} type-paragraph-small`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.setup}>
          <span className="type-paragraph-xsmall">Average setup time</span>
          <Pill variant="display" tone="success" showLeftIcon showRightIcon={false}>
            {data.averageSetupDays} days
          </Pill>
        </div>
      </Card>
    </section>
  );
}
