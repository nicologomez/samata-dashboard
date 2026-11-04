import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./QuickActions.module.css";

const actions = [
  {
    label: "Invite new employees",
    detail: "Add individually or bulk upload",
    href: "/employees",
    icon: "invite",
  },
  {
    label: "Manage Billing",
    detail: "View latest invoices and plan",
    href: "/billing",
    icon: "receipt-check",
  },
  {
    label: "Generate Report",
    detail: "Download anonymized usage data",
    href: "/analytics",
    icon: "report",
  },
] as const satisfies readonly {
  label: string;
  detail: string;
  href: string;
  icon: IconName;
}[];

export function QuickActions() {
  return (
    <section aria-labelledby="quick-heading" className={styles.quick}>
      <h2 id="quick-heading" className="type-label-medium-medium">
        <Icon name="grid" size={14} className={styles.headingIcon} /> Quick
        Actions
      </h2>
      <div className={styles.tiles}>
        {actions.map((action) => (
          <Link href={action.href} className={styles.tile} key={action.href}>
            <span aria-hidden="true" className={styles.iconTile}>
              <Icon
                name={action.icon}
                size={40}
                className={styles.actionIcon}
              />
            </span>
            <span>
              <strong className="type-label-medium-medium">
                {action.label}
              </strong>
              <small className="type-paragraph-xsmall">{action.detail}</small>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
