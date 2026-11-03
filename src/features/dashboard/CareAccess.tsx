import type { DashboardData } from "@/types/dashboard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import styles from "./CareAccess.module.css";

export function CareAccess({ data }: { data: DashboardData }) {
  return (
    <Card className={styles.panel}>
      <h3>Care Access</h3>
      <ul className={styles.statuses}>
        {data.care.map((item, index) => (
          <li key={item.label}>
            <span className={styles.statusIcon} aria-hidden="true">
              {["◷", "☼", "♧", "⊘"][index] ?? "•"}
            </span>
            <strong>{item.count}</strong>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.setup}>
        <span>Average setup time</span>
        <Badge tone="success">{data.averageSetupDays} days</Badge>
      </div>
      <div className={styles.rates}>
        <div>
          <strong>{data.activationRate}%</strong>
          <small>Activation Rate</small>
        </div>
        <div>
          <strong>{data.onboardRate}%</strong>
          <small>Onboard Rate</small>
        </div>
      </div>
    </Card>
  );
}
