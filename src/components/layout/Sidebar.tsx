"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // 1. Import Next Image
import { usePathname } from "next/navigation";
import { employerNav, inboxLink, type NavGroup } from "@/config/navigation";
import type { DashboardData } from "@/types/dashboard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import styles from "./Sidebar.module.css";

const navGroups: readonly NavGroup[] = ["Overview", "Workspace"];
type Props = { data: DashboardData; open: boolean; onClose: () => void };

export function Sidebar({ data, open, onClose }: Props) {
  const pathname = usePathname();
  const [orgOpen, setOrgOpen] = useState(false);

  function navItem(item: { label: string; href: string }) {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        onClick={onClose}
        className={active ? styles.active : ""}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.open : ""}`}
      aria-label="Employer navigation"
    >
      {/* 2. Replaced the ◈ placeholder with the official logo from public/images/ */}
      <div className={styles.brand}>
        <Image
          src="/images/samata-logo.svg"
          alt="Samata Health"
          width={150}
          height={32}
          priority
        />
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close navigation"
        >
          ×
        </button>
      </div>

      <div className={styles.organization}>
        <span className={styles.groupLabel}>{data.profile.plan}</span>
        <button
          className={styles.switcher}
          type="button"
          aria-label={`${data.profile.company} organization selector`}
          aria-expanded={orgOpen}
          aria-controls="organization-options"
          onClick={() => setOrgOpen((value) => !value)}
        >
          <span className={styles.companyMark} aria-hidden="true">
            T
          </span>
          <span>
            <strong>{data.profile.company}</strong>
            <small>{data.profile.domain}</small>
          </span>
          <span aria-hidden="true">⌄</span>
        </button>
        {orgOpen && (
          <div
            id="organization-options"
            className={styles.orgPanel}
            role="status"
          >
            <strong>TrilumenAI</strong>
            <small>Selected organization</small>
            <p>No other organizations in this demo.</p>
          </div>
        )}
      </div>

      <nav aria-label="Inbox" className={styles.inbox}>
        {navItem(inboxLink)}
      </nav>

      {navGroups.map((group) => (
        <nav className={styles.links} aria-label={group} key={group}>
          <h2>{group}</h2>
          {employerNav.filter((item) => item.group === group).map(navItem)}
        </nav>
      ))}

      <div className={styles.bottom}>
        <section className={styles.usage} aria-label="Sessions this month">
          <span>Sessions this month</span>
          <strong>{data.sessionUsage.used}</strong>
          <ProgressBar
            label="Sessions used out of monthly allowance"
            value={data.sessionUsage.used}
            max={data.sessionUsage.limit}
          />
          <small>
            {data.sessionUsage.used} of {data.sessionUsage.limit} used
          </small>
          <Link href="/analytics">View Details →</Link>
        </section>

        <nav aria-label="General" className={styles.links}>
          <h2>General</h2>
          {employerNav.filter((item) => item.group === "General").map(navItem)}
        </nav>
      </div>
    </aside>
  );
}
