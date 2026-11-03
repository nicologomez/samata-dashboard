"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./NavButton.module.css";

type Props = { href: string; children: ReactNode; onNavigate?: () => void };
export function NavButton({ href, children, onNavigate }: Props) {
  const selected = usePathname() === href;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={selected ? "page" : undefined}
      className={`${styles.link} ${selected ? styles.active : ""}`}
    >
      {children}
    </Link>
  );
}
