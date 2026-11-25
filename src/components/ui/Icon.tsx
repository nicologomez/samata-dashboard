import styles from "./Icon.module.css";

export const iconNames = [
  "home",
  "analytics",
  "inbox",
  "employees",
  "face-content",
  "integrations",
  "receipt-check",
  "help-circle",
  "settings",
  "settings-04",
  "sparkles",
  "clipboard",
  "bar-chart",
  "grid",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "check",
  "dot",
  "dot-small",
  "gantt-chart",
  "hourglass",
  "minus",
  "plus",
  "sun",
  "three-dot",
  "leaf",
  "slash-octagon",
  "invite",
  "report",
  "search",
  "menu",
  "close",
  "arrow-right",
  "arrow-down-right",
  "arrow-up-right",
  "signal",
  "team",
  "pie",
  "calendar",
  "bookmark",
] as const;

export type IconName = (typeof iconNames)[number];
export type IconSize = 8 | 12 | 14 | 16 | 18 | 20 | 24 | 32 | 40;

type Props = {
  name: IconName;
  size?: IconSize;
  className?: string;
  label?: string;
};

export function Icon({ name, size = 24, className = "", label }: Props) {
  return (
    <span
      className={`${styles.icon} ${className}`}
      data-icon={name}
      data-size={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
