import type { IconName } from "@/components/ui/Icon";
import type { QuickActionItem } from "@/types/common";

export type NavGroup = "Overview" | "Workspace" | "General";
export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly group: NavGroup;
  readonly icon: IconName;
};

export const employerNav = [
  { label: "Home", href: "/", group: "Overview", icon: "home" },
  {
    label: "Analytics",
    href: "/analytics",
    group: "Overview",
    icon: "analytics",
  },
  {
    label: "Employees",
    href: "/employees",
    group: "Workspace",
    icon: "face-content",
  },
  {
    label: "Integrations",
    href: "/integrations",
    group: "Workspace",
    icon: "integrations",
  },
  {
    label: "Billing",
    href: "/billing",
    group: "Workspace",
    icon: "receipt-check",
  },
  { label: "Support", href: "/support", group: "General", icon: "help-circle" },
  { label: "Settings", href: "/settings", group: "General", icon: "settings-04" },
] as const satisfies readonly NavItem[];

export const inboxLink = {
  label: "Inbox",
  href: "/inbox",
  icon: "inbox",
} as const;

export const employerQuickActions = [
  {
    label: "Invite new employees",
    detail: "Add individually or bulk upload",
    href: "/employees",
    icon: "invite",
  },
  {
    label: "Manage Billing",
    detail: "View latest invoices and plan",
    href: "/billing",
    icon: "receipt-check",
  },
  {
    label: "Generate Report",
    detail: "Download anonymized usage data",
    href: "/analytics",
    icon: "report",
  },
] as const satisfies readonly QuickActionItem[];
