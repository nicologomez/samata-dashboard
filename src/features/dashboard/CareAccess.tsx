import type { EmployerDashboardData } from "@/types/employer";
import { careStatusIcons } from "@/lib/care";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import styles from "./CareAccess.module.css";

type CareAccessData = Pick<
  EmployerDashboardData,
  "care" | "averageSetupDays" | "activationRate" | "onboardRate"
>;

export function CareAccess({
  data,
  showBookmark = false,
}: {
  data: CareAccessData;
  showBookmark?: boolean;
}) {
  return (
    <Card
      surface="brand"
      aria-labelledby="care-heading"
      className={styles.panel}
    >
      {showBookmark && (
        <span aria-hidden="true" className={styles.bookmark}>
          <Icon name="bookmark" size={24} />
        </span>
      )}

      {/* Header */}
      <div className={styles.header}>
        <h2 id="care-heading" className="type-heading-h7">
          Care Access
        </h2>
      </div>

      {/* Middle */}
      <div className={styles.middle}>
        <ul className={styles.statuses}>
          {data.care.map((item) => (
            <li key={item.label}>
              <span className={styles.statusIcon} data-status={item.label}>
                <Icon
                  name={careStatusIcons[item.label] ?? "hourglass"}
                  size={16}
                />
              </span>

              <strong className="type-heading-alt-italic-h6">
                {item.count}
              </strong>

              <span className="type-paragraph-small">{item.label}</span>
            </li>
          ))}
        </ul>

        <div className={styles.setup}>
          <span className="type-paragraph-xsmall">Average setup time</span>

          <Pill variant="display" tone="success" showLeftIcon showRightIcon={false}>
            {data.averageSetupDays} days
          </Pill>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.rates}>
          <div>
            <strong className="type-heading-alt-medium-h6">
              {data.activationRate}%
            </strong>
            <small className="type-paragraph-xsmall">Activation Rate</small>
          </div>

          <div>
            <strong className="type-heading-alt-medium-h6">
              {data.onboardRate}%
            </strong>
            <small className="type-paragraph-xsmall">Onboard Rate</small>
          </div>
        </div>
      </div>
    </Card>
  );
}
