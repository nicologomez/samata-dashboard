import type { DashboardData } from "@/types/dashboard";
import { Badge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./CareAccess.module.css";

const careIcons = {
  "Pending Access": "hourglass",
  "Active Benefits": "sun",
  "Grace Period": "leaf",
  Deactivated: "slash-octagon",
} as const satisfies Record<string, IconName>;

export function CareAccess({ data }: { data: DashboardData }) {
  return (
    <section className={styles.panel}>
      <h3 className="type-heading-h7">Care Access</h3>
      <ul className={styles.statuses}>
        {data.care.map((item) => (
          <li key={item.label}>
            <span className={styles.statusIcon} data-status={item.label}>
              <Icon
                name={
                  careIcons[item.label as keyof typeof careIcons] ?? "hourglass"
                }
                size={12}
              />
            </span>
            <strong className="type-heading-alt-italic-h6">{item.count}</strong>
            <span className="type-paragraph-small">{item.label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.setup}>
        <span className="type-paragraph-xsmall">Average setup time</span>
        <Badge tone="success">{data.averageSetupDays} days</Badge>
      </div>
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
    </section>
  );
}
