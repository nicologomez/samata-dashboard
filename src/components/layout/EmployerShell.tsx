"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { employerNav, inboxLink, type NavGroup } from "@/config/navigation";
import type { EmployerShellData } from "@/types/employer";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AddEmployeeDialog } from "@/features/employees/AddEmployeeDialog";
import { PortalShell } from "./PortalShell";
import sidebarStyles from "./Sidebar.module.css";

const primaryGroups: readonly NavGroup[] = ["Overview", "Workspace"];

type Props = {
  children: ReactNode;
  data: EmployerShellData;
};

/** Employer-specific adapter connecting navigation config, session quota card, and AddEmployeeDialog to PortalShell. */
export function EmployerShell({ children, data }: Props) {
  const [inviteOpen, setInviteOpen] = useState(false);

  const groups = primaryGroups.map((group) => ({
    title: group,
    items: employerNav.filter((item) => item.group === group),
  }));

  const footerGroup = {
    title: "General",
    items: employerNav.filter((item) => item.group === "General"),
  };

  const quotaCard = (
    <section className={sidebarStyles.usage} aria-label="Sessions this month">
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
  );

  return (
    <>
      <PortalShell
        workspace={{
          label: data.profile.plan,
          name: data.profile.company,
          subtitle: data.profile.domain,
          emptyNote: "No other organizations in this demo.",
        }}
        topItem={inboxLink}
        groups={groups}
        footerGroup={footerGroup}
        quotaCard={quotaCard}
        navItems={employerNav}
        profile={{
          user: data.profile.user,
          role: data.profile.role,
          menuNote: "Employer demo profile",
        }}
        primaryAction={{
          label: "Add Employees",
          icon: "plus",
          onClick: () => setInviteOpen(true),
        }}
      >
        {children}
      </PortalShell>
      <AddEmployeeDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
    </>
  );
}
