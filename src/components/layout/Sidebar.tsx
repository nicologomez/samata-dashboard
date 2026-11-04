"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  employerNav,
  inboxLink,
  type NavGroup,
  type NavItem,
} from "@/config/navigation";
import type { DashboardData } from "@/types/dashboard";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import styles from "./Sidebar.module.css";

const navGroups: readonly NavGroup[] = ["Overview", "Workspace"];
type Props = { data: DashboardData; open: boolean; onClose: () => void };
export function Sidebar({ data, open, onClose }: Props) {
  const pathname = usePathname();
  const [orgOpen, setOrgOpen] = useState(false);
  function navItem(item: Pick<NavItem, "label" | "href" | "icon">) {
    const active = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        onClick={onClose}
        className={`${styles.navLink} type-label-medium-medium ${active ? styles.active : ""}`}
      >
        <Icon name={item.icon} size={20} className={styles.navIcon} />
        <span>{item.label}</span>
      </Link>
    );
  }
  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.open : ""}`}
      aria-label="Employer navigation"
    >
      <div className={styles.brand}>
        <span aria-hidden="true" className="type-heading-h4">
          ◈
        </span>
        <strong className="type-heading-h5">Samata Health</strong>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close navigation"
        >
          <Icon name="close" size={20} />
        </button>
      </div>
      <div className={styles.organization}>
        <span className={`${styles.groupLabel} type-overlines-small`}>
          {data.profile.plan}
        </span>
        <button
          className={styles.switcher}
          type="button"
          aria-label={`${data.profile.company} organization selector`}
          aria-expanded={orgOpen}
          aria-controls="organization-options"
          onClick={() => setOrgOpen((value) => !value)}
        >
          <span
            className={`${styles.companyMark} type-label-semibold-medium`}
            aria-hidden="true"
          >
            T
          </span>
          <span>
            <strong className="type-label-medium-medium">
              {data.profile.company}
            </strong>
            <small className="type-paragraph-small">
              {data.profile.domain}
            </small>
          </span>
          <Icon name="chevron-down" size={20} className={styles.chevron} />
        </button>
        {orgOpen && (
          <div
            id="organization-options"
            className={styles.orgPanel}
            role="status"
          >
            <strong className="type-label-medium-medium">TrilumenAI</strong>
            <small className="type-paragraph-xsmall">
              Selected organization
            </small>
            <p className="type-paragraph-xsmall">
              No other organizations in this demo.
            </p>
          </div>
        )}
      </div>
      <nav aria-label="Inbox" className={styles.inbox}>
        {navItem(inboxLink)}
      </nav>
      {navGroups.map((group) => (
        <nav className={styles.links} aria-label={group} key={group}>
          <h2 className="type-overlines-small">{group}</h2>
          {employerNav.filter((item) => item.group === group).map(navItem)}
        </nav>
      ))}
      <div className={styles.bottom}>
        <section className={styles.usage} aria-label="Sessions this month">
          <span className="type-paragraph-small">Sessions this month</span>
          <strong className="type-heading-alt-medium-h3">
            {data.sessionUsage.used}
          </strong>
          <ProgressBar
            label="Sessions used out of monthly allowance"
            value={data.sessionUsage.used}
            max={data.sessionUsage.limit}
          />
          <small className="type-label-medium-medium">
            {data.sessionUsage.used} of {data.sessionUsage.limit} used
          </small>
          <Link className="type-label-medium-small" href="/analytics">
            View Details <Icon name="arrow-right" size={12} />
          </Link>
        </section>
        <nav aria-label="General" className={styles.links}>
          <h2 className="type-overlines-small">General</h2>
          {employerNav.filter((item) => item.group === "General").map(navItem)}
        </nav>
      </div>
    </aside>
  );
}
