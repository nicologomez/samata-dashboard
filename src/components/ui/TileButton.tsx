import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName, type IconSize } from "./Icon";
import styles from "./TileButton.module.css";

type BaseProps = {
  title: string;
  description?: string;
  icon?: IconName;
  iconSize?: IconSize;
  className?: string;
};

type LinkTileProps = BaseProps & {
  href: string;
  onClick?: () => void;
};

type ActionTileProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title" | "children"> & {
    href?: undefined;
  };

export type TileButtonProps = LinkTileProps | ActionTileProps;

/** Clickable horizontal tile supporting both route navigation and button actions. */
export function TileButton({
  title,
  description,
  icon,
  iconSize = 40,
  className = "",
  ...rest
}: TileButtonProps) {
  const content = (
    <>
      {icon && (
        <span aria-hidden="true" className={styles.iconTile}>
          <Icon name={icon} size={iconSize} className={styles.icon} />
        </span>
      )}
      <span className={styles.copy}>
        <strong className="type-label-medium-medium">{title}</strong>
        {description && (
          <small className="type-paragraph-xsmall">{description}</small>
        )}
      </span>
    </>
  );

  const classes = `${styles.tile} ${icon ? "" : styles.noIcon} ${className}`;

  if ("href" in rest && rest.href !== undefined) {
    return (
      <Link href={rest.href} onClick={rest.onClick} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest;

  return (
    <button type={type} {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
