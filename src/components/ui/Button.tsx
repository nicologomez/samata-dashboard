import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const typeClass =
    size === "xl"
      ? "type-label-medium-large"
      : size === "xs" || size === "sm"
        ? "type-label-medium-small"
        : "type-label-medium-medium";
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${typeClass} ${className}`}
    />
  );
}
