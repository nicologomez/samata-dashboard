export type NavGroup = "Overview" | "Workspace" | "General";
export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly group: NavGroup;
};

export const employerNav = [
  { label: "Home", href: "/", group: "Overview" },
  { label: "Analytics", href: "/analytics", group: "Overview" },
  { label: "Employees", href: "/employees", group: "Workspace" },
  { label: "Integrations", href: "/integrations", group: "Workspace" },
  { label: "Billing", href: "/billing", group: "Workspace" },
  { label: "Support", href: "/support", group: "General" },
  { label: "Settings", href: "/settings", group: "General" },
] as const satisfies readonly NavItem[];

export const inboxLink = { label: "Inbox", href: "/inbox" } as const;
