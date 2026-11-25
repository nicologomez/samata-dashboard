import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Icon, type IconName, type IconSize } from "./Icon";
import styles from "./Button.module.css";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "white"
  | "action"
  | "pills"
  | "basic";

type ButtonMode = "button" | "icon";

type ButtonState =
  | "default"
  | "hover"
  | "pressed"
  | "focus"
  | "disabled"
  | "transparent";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  mode?: ButtonMode;
  state?: ButtonState;

  children?: ReactNode;
  text?: string;
  textVisible?: boolean;

  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
};

const iconSizes: Record<ButtonSize, IconSize> = {
  xs: 16,
  sm: 20,
  md: 20,
  lg: 20,
  xl: 24,
};

const typography: Record<ButtonSize, string> = {
  xs: "type-label-medium-small",
  sm: "type-label-medium-medium",
  md: "type-label-medium-large",
  lg: "type-label-semibold-large",
  xl: "type-label-semibold-large",
};

const actionTypography: Record<ButtonSize, string> = {
  xs: "type-paragraph-xsmall",
  sm: "type-paragraph-small",
  md: "type-paragraph-medium",
  lg: "type-paragraph-medium",
  xl: "type-paragraph-medium",
};

export function Button({
  variant = "primary",
  size = "md",
  mode = "button",
  state,
  children,
  text,
  textVisible = true,
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon = "close",
  rightIcon = "close",
  className = "",
  disabled = false,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: Props) {
  const appearance = variant;

  const isDisabled = disabled || state === "disabled";
  const isIconOnly = mode === "icon";

  const content = children ?? text ?? "Button";

  const labelClass =
    appearance === "action" ? actionTypography[size] : typography[size];

  const showText = textVisible && !isIconOnly;

  const resolvedLeftIcon = isIconOnly || showLeftIcon;

  const accessibleLabel =
    ariaLabel ?? (typeof content === "string" ? content : undefined);

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      aria-label={accessibleLabel}
      data-appearance={appearance}
      data-size={size}
      data-mode={mode}
      data-state={state}
      className={`${styles.button} ${styles[size]} ${className}`}
    >
      {resolvedLeftIcon && (
        <Icon name={leftIcon} size={iconSizes[size]} className={styles.icon} />
      )}

      {showText && (
        <span className={`${styles.text} ${labelClass}`}>{content}</span>
      )}

      {!isIconOnly && showRightIcon && (
        <Icon name={rightIcon} size={iconSizes[size]} className={styles.icon} />
      )}
    </button>
  );
}
