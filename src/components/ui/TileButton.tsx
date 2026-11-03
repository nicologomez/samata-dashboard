import type { ButtonHTMLAttributes } from "react";
import styles from "./TileButton.module.css";

export function TileButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`${styles.tile} ${className}`}
    />
  );
}
