import type { SeatUtilizationData } from "@/types/employerBilling";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProgressBar } from "@/components/ui/ProgressBar";
import styles from "./SeatUtilizationCard.module.css";

type Props = {
  data: SeatUtilizationData;
};

/** Right-rail seat capacity progress and billing status breakdown card. */
export function SeatUtilizationCard({ data }: Props) {
  return (
    <section
      aria-labelledby="seat-utilization-heading"
      className={styles.section}
    >
      <SectionHeader
        id="seat-utilization-heading"
        icon="gantt-chart"
        title="Seat Utilization"
      />

      <Card
        surface="default"
        padding="none"
        elevation="xs"
        glow
        className={styles.card}
      >
        <div className={styles.summary}>
          <p className={`${styles.subtitle} type-paragraph-small`}>
            {data.subtitle}
          </p>
          <strong className={`${styles.ratio} type-heading-alt-medium-h4`}>
            {data.activeSeats} / {data.totalCapacity}
          </strong>
          <ProgressBar
            label="Seat utilization"
            value={data.activeSeats}
            max={data.totalCapacity}
          />
          <p className={`${styles.caption} type-paragraph-xsmall`}>
            {data.caption}
          </p>
        </div>

        <ul className={styles.breakdown}>
          {data.breakdown.map((item) => (
            <li key={item.label} className={styles.row}>
              <div className={styles.rowTop}>
                <span className={`${styles.rowLabel} type-label-medium-medium`}>
                  {item.label}
                </span>
                <span className={`${styles.rowCount} type-paragraph-small`}>
                  {item.count}
                </span>
              </div>
              <p className={`${styles.rowNote} type-paragraph-xsmall`}>
                {item.note}
              </p>
            </li>
          ))}
        </ul>

        <p className={`${styles.disclaimer} type-paragraph-small`}>
          {data.disclaimer}
        </p>
      </Card>
    </section>
  );
}
