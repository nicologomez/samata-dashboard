import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./SectionHeader.module.css";

type Props = {
  id?: string;
  title: string;
  icon?: IconName;
  action?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

/** Standard section heading bar with optional leading icon and trailing control slot. */
export function SectionHeader({
  id,
  title,
  icon,
  action,
  as: Heading = "h2",
  className = "",
}: Props) {
  return (
    <div className={`${styles.header} ${className}`}>
      <Heading id={id} className={`${styles.title} type-label-medium-medium`}>
        {icon && <Icon name={icon} size={14} className={styles.icon} />}
        <span>{title}</span>
      </Heading>
      {action}
    </div>
  );
}
