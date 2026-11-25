import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Pill.module.css";

export type PillVariant = "display" | "action" | "hash";
export type PillTone = "plain" | "success" | "error" | "info" | "warning";

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: PillVariant;
  tone?: PillTone;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showText?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  children?: ReactNode;
};

/** Figma Pill atom with independent left/right icon toggles and balanced inner text padding. */
export function Pill({
  variant = "display",
  tone = "plain",
  showLeftIcon = variant !== "hash",
  showRightIcon = false,
  showText = true,
  leftIcon,
  rightIcon,
  className = "",
  children,
  ...props
}: Props) {
  const iconSize = variant === "action" ? 16 : 12;
  const resolvedLeftIcon =
    leftIcon ?? (variant === "action" ? "close" : "dot-small");
  const resolvedRightIcon =
    rightIcon ?? (variant === "action" ? "close" : "dot-small");

  return (
    <span
      {...props}
      data-variant={variant}
      data-tone={tone}
      className={`${styles.pill} type-label-medium-small ${className}`}
    >
      {variant !== "hash" && showLeftIcon && (
        <Icon name={resolvedLeftIcon} size={iconSize} className={styles.icon} />
      )}
      {showText && <span className={styles.textWrap}>{children}</span>}
      {variant !== "hash" && showRightIcon && (
        <Icon name={resolvedRightIcon} size={iconSize} className={styles.icon} />
      )}
    </span>
  );
}
