import type { IconName } from "@/components/ui/Icon";

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
