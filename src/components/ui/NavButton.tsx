"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./NavButton.module.css";

type Props = {
  href: string;
  icon?: IconName;
  label?: string;
  badge?: string | number;
  children?: ReactNode;
  onNavigate?: () => void;
  className?: string;
};

/** Sidebar route link with active state, optional icon, and optional badge. */
export function NavButton({
  href,
  icon,
  label,
  badge,
  children,
  onNavigate,
  className = "",
}: Props) {
  const selected = usePathname() === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={selected ? "page" : undefined}
      className={`${styles.link} type-label-medium-medium ${selected ? styles.active : ""} ${className}`}
    >
      {icon && <Icon name={icon} size={20} className={styles.icon} />}
      <span className={styles.label}>{children ?? label}</span>
      {badge !== undefined && (
        <span className={`${styles.badge} type-label-medium-xsmall`}>
          {badge}
        </span>
      )}
    </Link>
  );
}
