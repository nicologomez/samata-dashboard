import type { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "success" | "error" | "neutral";
};
export function Badge({
  tone = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`${styles.badge} ${styles[tone]} type-label-medium-small ${className}`}
    />
  );
}
