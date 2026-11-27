"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@/components/ui/Avatar";
import { Icon, type IconName } from "@/components/ui/Icon";
import { NavButton } from "@/components/ui/NavButton";
import styles from "./Sidebar.module.css";

export type PortalNavItem = {
  readonly label: string;
  readonly href: string;
  readonly icon: IconName;
};

export type PortalWorkspace = {
  readonly label: string;
  readonly name: string;
  readonly subtitle: string;
  readonly emptyNote?: string;
};

type NavSection = {
  readonly title: string;
  readonly items: readonly PortalNavItem[];
};

type Props = {
  homeHref?: string;
  workspace?: PortalWorkspace;
  topItem?: PortalNavItem;
  groups: readonly NavSection[];
  footerGroup?: NavSection;
  quotaCard?: ReactNode;
  open: boolean;
  onClose: () => void;
};

/** Portal-agnostic sticky navigation rail with brand lockup, optional workspace switcher, grouped links, and bottom slot. */
export function Sidebar({
  homeHref = "/",
  workspace,
  topItem,
  groups,
  footerGroup,
  quotaCard,
  open,
  onClose,
}: Props) {
  const [orgOpen, setOrgOpen] = useState(false);

  function renderNavItem(item: PortalNavItem) {
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
      aria-label="Primary navigation"
    >
      <div className={styles.brand}>
        <Link href={homeHref} aria-label="Go to Home">
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

      {workspace && (
        <div className={styles.organization}>
          <span className={`${styles.groupLabel} type-overlines-small`}>
            {workspace.label}
          </span>
          <button
            className={styles.switcher}
            type="button"
            aria-label={`${workspace.name} workspace selector`}
            aria-expanded={orgOpen}
            aria-controls="workspace-options"
            onClick={() => setOrgOpen((value) => !value)}
          >
            <Avatar name={workspace.name} size={36} />
            <span>
              <strong className="type-label-medium-medium">
                {workspace.name}
              </strong>
              <small className="type-paragraph-small">
                {workspace.subtitle}
              </small>
            </span>
            <Icon name="chevron-down" size={20} className={styles.chevron} />
          </button>
          {orgOpen && (
            <div
              id="workspace-options"
              className={styles.orgPanel}
              role="status"
            >
              <strong className="type-label-medium-medium">
                {workspace.name}
              </strong>
              <small className="type-paragraph-xsmall">Selected workspace</small>
              {workspace.emptyNote && (
                <p className="type-paragraph-xsmall">{workspace.emptyNote}</p>
              )}
            </div>
          )}
        </div>
      )}

      {topItem && (
        <nav aria-label={topItem.label} className={styles.inbox}>
          {renderNavItem(topItem)}
        </nav>
      )}

      {groups.map((group) => (
        <nav className={styles.links} aria-label={group.title} key={group.title}>
          <h2 className="type-overlines-small">{group.title}</h2>
          {group.items.map(renderNavItem)}
        </nav>
      ))}

      {(quotaCard || footerGroup) && (
        <div className={styles.bottom}>
          {quotaCard}
          {footerGroup && (
            <nav aria-label={footerGroup.title} className={styles.links}>
              <h2 className="type-overlines-small">{footerGroup.title}</h2>
              {footerGroup.items.map(renderNavItem)}
            </nav>
          )}
        </div>
      )}
    </aside>
  );
}
