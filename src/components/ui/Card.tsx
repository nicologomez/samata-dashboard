import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";

type Surface = "default" | "brand" | "gradient";
type Padding = "none" | "md" | "lg";
type Elevation = "xs" | "sm";

type Props = HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "div";
  surface?: Surface;
  padding?: Padding;
  elevation?: Elevation;
  glow?: boolean;
};

/** Neutral surface container primitive composed by dashboard cards and panels. */
export function Card({
  as: Component = "section",
  surface = "default",
  padding = "lg",
  elevation = "xs",
  glow = false,
  className = "",
  ...props
}: Props) {
  return (
    <Component
      {...props}
      className={`${styles.card} ${styles[`surface-${surface}`]} ${styles[`pad-${padding}`]} ${styles[`elevation-${elevation}`]} ${glow ? styles.glow : ""} ${className}`}
    />
  );
}
