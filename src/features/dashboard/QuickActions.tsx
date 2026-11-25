import type { IconName } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TileButton } from "@/components/ui/TileButton";
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
      <SectionHeader id="quick-heading" icon="grid" title="Quick Actions" />
      <div className={styles.tiles}>
        {actions.map((action) => (
          <TileButton
            key={action.href}
            href={action.href}
            icon={action.icon}
            title={action.label}
            description={action.detail}
          />
        ))}
      </div>
    </section>
  );
}
