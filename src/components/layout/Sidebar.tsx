"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  employerNav,
  inboxLink,
  type NavGroup,
  type NavItem,
} from "@/config/navigation";
import type { DashboardData } from "@/types/dashboard";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { NavButton } from "@/components/ui/NavButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import styles from "./Sidebar.module.css";

const navGroups: readonly NavGroup[] = ["Overview", "Workspace"];
type Props = { data: DashboardData; open: boolean; onClose: () => void };

export function Sidebar({ data, open, onClose }: Props) {
  const [orgOpen, setOrgOpen] = useState(false);

  function navItem(item: Pick<NavItem, "label" | "href" | "icon">) {
    return (
      <NavButton
        key={item.href}
        href={item.href}
        icon={item.icon}
        label={item.label}
        onNavigate={onClose}
      />
    );
  }
  return (
    <aside
      className={`${styles.sidebar} ${open ? styles.open : ""}`}
      aria-label="Employer navigation"
    >
      <div className={styles.brand}>
        <Link href="/" aria-label="Go to Home">
          <Image
            src="/images/samata-logo.svg"
            alt="Samata Health"
            width={192}
            height={40}
            loading="eager"
            className={styles.logo}
          />
        </Link>
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
          <Avatar name={data.profile.company} size={36} />
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
            <strong className="type-label-medium-medium">
              {data.profile.company}
            </strong>
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
