import type { QuickActionItem } from "@/types/common";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TileButton } from "@/components/ui/TileButton";
import styles from "./QuickActions.module.css";

type Props = {
  actions: readonly QuickActionItem[];
  title?: string;
};

/** Universal quick-action tile list driven by action item props. */
export function QuickActions({ actions, title = "Quick Actions" }: Props) {
  return (
    <section aria-labelledby="quick-heading" className={styles.quick}>
      <SectionHeader id="quick-heading" icon="grid" title={title} />
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
