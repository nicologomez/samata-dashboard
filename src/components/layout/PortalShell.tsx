"use client";

import { useState, type ReactNode } from "react";
import { Header, type PortalProfile } from "./Header";
import { Sidebar, type PortalNavItem, type PortalWorkspace } from "./Sidebar";
import type { IconName } from "@/components/ui/Icon";
import styles from "./EmployerShell.module.css";

export type PortalNavGroup = {
  readonly title: string;
  readonly items: readonly PortalNavItem[];
};

type Props = {
  homeHref?: string;
  workspace?: PortalWorkspace;
  topItem?: PortalNavItem;
  groups: readonly PortalNavGroup[];
  footerGroup?: PortalNavGroup;
  quotaCard?: ReactNode;
  navItems: readonly Pick<PortalNavItem, "href" | "label">[];
  profile: PortalProfile;
  primaryAction?: {
    readonly label: string;
    readonly icon?: IconName;
    readonly onClick: () => void;
  };
  children: ReactNode;
};

/** Universal portal layout shell combining sticky Sidebar navigation, top Header bar, and scrollable content slot. */
export function PortalShell({
  homeHref = "/",
  workspace,
  topItem,
  groups,
  footerGroup,
  quotaCard,
  navItems,
  profile,
  primaryAction,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Sidebar
        homeHref={homeHref}
        workspace={workspace}
        topItem={topItem}
        groups={groups}
        footerGroup={footerGroup}
        quotaCard={quotaCard}
        open={open}
        onClose={() => setOpen(false)}
      />
      <div className={styles.main}>
        <Header
          navItems={navItems}
          profile={profile}
          primaryAction={primaryAction}
          onOpenMenu={() => setOpen(true)}
        />
        {children}
      </div>
    </div>
  );
}
