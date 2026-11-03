import Link from "next/link";
import styles from "./QuickActions.module.css";

const actions = [
  {
    label: "Invite new employees",
    detail: "Add individually or bulk upload",
    href: "/employees",
    icon: "✉",
  },
  {
    label: "Manage Billing",
    detail: "View latest invoices and plan",
    href: "/billing",
    icon: "▤",
  },
  {
    label: "Generate Report",
    detail: "Download anonymized usage data",
    href: "/analytics",
    icon: "▣",
  },
] as const;

export function QuickActions() {
  return (
    <section aria-labelledby="quick-heading" className={styles.quick}>
      <h2 id="quick-heading">▦ Quick Actions</h2>
      <div className={styles.tiles}>
        {actions.map((action) => (
          <Link href={action.href} className={styles.tile} key={action.href}>
            <span aria-hidden="true" className={styles.icon}>
              {action.icon}
            </span>
            <span>
              <strong>{action.label}</strong>
              <small>{action.detail}</small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
