import type { EmployerSupportData } from "@/types/employerSupport";

export const employerSupportFixture: EmployerSupportData = {
  hero: {
    sectionTitle: "TrilumenAI Enterprise Support",
    heading: "How can we help you today?",
    subtitle:
      "Use knowledge base, reach customer success manager, or submit support ticket.",
    searchPlaceholder: "Search articles, FAQs, and past tickets...",
    shortcuts: [
      {
        id: "open-ticket",
        label: "Open a ticket",
        icon: "file-02",
        targetId: "support-tickets",
      },
      {
        id: "live-chat",
        label: "Live Chat",
        icon: "message-dots-square",
        targetId: "csm-rail",
      },
      {
        id: "system-status",
        label: "System Status",
        icon: "check-verified-01",
        targetId: "status-health",
      },
      {
        id: "browse-faqs",
        label: "Browse FAQs",
        icon: "help-circle",
        targetId: "support-faq",
      },
      {
        id: "documentation",
        label: "Documentation",
        icon: "file-06",
        targetId: "resources-docs",
      },
    ],
  },
  csm: {
    name: "Helena Ramirez",
    avatarSrc: "/images/support/csm-helena.png",
    statusText: "Senior CSM · Online",
    email: "Email: helena@samata.com",
    actions: [
      {
        id: "start-chat",
        title: "Start live chat",
        detail: "Responds in ~12 mins",
        icon: "message-dots-square",
      },
      {
        id: "schedule-call",
        title: "Schedule a call",
        detail: "30 min / 60 min available",
        icon: "calendar-plus-01",
      },
    ],
  },
  totalTickets: 24,
  tickets: [
    {
      id: "tkt-2026-040",
      ticketCode: "#TKT-2026-040",
      subject: "BambooHR sync failing for 18 new hires added on Jun 11",
      latestReply:
        "Helena Ramirez (CSM): Hi Isabela, I've escalated this to our infrastructure team. We're seeing intermittent delays with BambooHR's SCIM API today",
      priority: "high",
      category: "HRIS Integration",
      categoryTone: "info",
      updatedAtLabel: "1 hour ago",
      status: "pending",
    },
    {
      id: "tkt-2026-039",
      ticketCode: "#TKT-2026-039",
      subject: "Invoice INV-2025-005 — need itemized breakdown for finance audit",
      latestReply:
        "Helena Ramirez (CSM): Absolutely, Isabela. I've requested a detailed line-item export from our finance team. This typically takes 1 business day.",
      priority: "medium",
      category: "Billing",
      categoryTone: "success",
      updatedAtLabel: "Mar 8, 2026",
      status: "open",
    },
    {
      id: "tkt-2026-038",
      ticketCode: "#TKT-2026-038",
      subject:
        "Employee access error — SSO redirect loop for @trilumenai.com accounts",
      latestReply:
        "Isabela Castillo: Confirmed — all 12 employees are now able to log in successfully. Thanks for the rapid fix, Sofia!",
      priority: "high",
      category: "Security",
      categoryTone: "warning",
      updatedAtLabel: "Mar 2, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-037",
      ticketCode: "#TKT-2026-037",
      subject: "Request: bulk deactivate 14 contractors offboarded on May 31",
      latestReply:
        "Helena Ramirez (CSM): Confirmed — all 14 contractor accounts have been deactivated as of June 1 and will not be counted in your June billing cycle.",
      priority: "low",
      category: "Employee Management",
      categoryTone: "success",
      updatedAtLabel: "Feb 28, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-036",
      ticketCode: "#TKT-2026-036",
      subject: "Analytics export — can you add department filter to CSV",
      latestReply:
        "Helena Ramirez (CSM): Great feedback Sarah! Department-level filtering is on our Q3 roadmap. I've added your request to our feature tracker and tagged it as high priority for enterprise accounts.",
      priority: "high",
      category: "Technical Issue",
      categoryTone: "info",
      updatedAtLabel: "Feb 24, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-035",
      ticketCode: "#TKT-2026-035",
      subject:
        "Onboarding rate question — only 61% of invites accepted in first 2 weeks",
      latestReply:
        "Helena Ramirez (CSM): 61% is actually within normal range for week 2 — most plans see 70-80% by week 6 after our automated reminder sequence completes.",
      priority: "medium",
      category: "HRIS Integration",
      categoryTone: "info",
      updatedAtLabel: "Feb 19, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-034",
      ticketCode: "#TKT-2026-034",
      subject: "Configure Okta SCIM attribute mapping for department codes",
      latestReply:
        "Helena Ramirez (CSM): Updated the attribute mapping JSON in your Okta app.",
      priority: "medium",
      category: "Security",
      categoryTone: "warning",
      updatedAtLabel: "Feb 12, 2026",
      status: "open",
    },
    {
      id: "tkt-2026-033",
      ticketCode: "#TKT-2026-033",
      subject: "Update AP email recipient for monthly automated receipts",
      latestReply:
        "Helena Ramirez (CSM): Added ap@trilumenai.com to primary billing contacts.",
      priority: "low",
      category: "Billing",
      categoryTone: "success",
      updatedAtLabel: "Feb 4, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-032",
      ticketCode: "#TKT-2026-032",
      subject: "Verify quarterly executive utilization deck metrics",
      latestReply:
        "Helena Ramirez (CSM): Confirmed all figures match the Q1 snapshot.",
      priority: "low",
      category: "Technical Issue",
      categoryTone: "info",
      updatedAtLabel: "Jan 27, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-031",
      ticketCode: "#TKT-2026-031",
      subject: "Add custom Slack announcement template for mental health week",
      latestReply:
        "Helena Ramirez (CSM): Uploaded 3 co-branded templates into the toolkit.",
      priority: "low",
      category: "Employee Management",
      categoryTone: "success",
      updatedAtLabel: "Jan 18, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-030",
      ticketCode: "#TKT-2026-030",
      subject: "Audit log retention window inquiry for SOC 2 review",
      latestReply:
        "Helena Ramirez (CSM): Attached the 7-year compliance retention attestation.",
      priority: "medium",
      category: "Security",
      categoryTone: "warning",
      updatedAtLabel: "Jan 11, 2026",
      status: "resolved",
    },
    {
      id: "tkt-2026-029",
      ticketCode: "#TKT-2026-029",
      subject: "Clarify grace period billing after employee offboarding",
      latestReply:
        "Helena Ramirez (CSM): Shared the prorated usage rules from Section 4.",
      priority: "low",
      category: "Billing",
      categoryTone: "success",
      updatedAtLabel: "Jan 4, 2026",
      status: "resolved",
    },
  ],
  systemStatuses: [
    {
      id: "booking",
      name: "Booking & scheduling",
      statusLabel: "Operational",
      tone: "success",
    },
    {
      id: "portal",
      name: "Employee portal",
      statusLabel: "Operational",
      tone: "success",
    },
    {
      id: "hris",
      name: "HRIS sync (BambooHR)",
      statusLabel: "Minor delays",
      tone: "warning",
    },
    {
      id: "video",
      name: "Video sessions",
      statusLabel: "Operational",
      tone: "success",
    },
    {
      id: "analytics",
      name: "Employer analytics",
      statusLabel: "Operational",
      tone: "success",
    },
  ],
  lastCheckedLabel: "Last checked 4 min ago",
  accountHealth: [
    { id: "next-billing", label: "Next Billing", value: "Mar 31, 2026" },
    {
      id: "uptime",
      label: "Platform uptime (30d)",
      value: "99.97%",
      dotTone: "success",
    },
    { id: "due-date", label: "Due Date", value: "Mar 31, 2026" },
    {
      id: "open-tickets",
      label: "Open tickets",
      value: "2",
      dotTone: "success",
    },
    {
      id: "resolution-time",
      label: "Avg resolution time",
      value: "2 days",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      topic: "employees",
      question: "How do I add employees in bulk?",
      answer:
        "Open Employees > Add Employee and upload a CSV file with full name, work email, and employment type, or enable automatic sync in Integrations > BambooHR.",
    },
    {
      id: "faq-2",
      topic: "integrations",
      question: "Why aren't my BambooHR employees syncing?",
      answer:
        "Verify that each employee record in BambooHR includes a valid work email and active status. You can trigger a manual resync and inspect skipped records in Integrations > Activity Log.",
    },
    {
      id: "faq-3",
      topic: "clinical",
      question: "Can employees see each other's session data?",
      answer:
        "Never. Individual care notes, bookings, and provider relationships are strictly confidential under HIPAA and isolated per employee account.",
    },
    {
      id: "faq-4",
      topic: "billing",
      question: "How does billing work when I add or remove seats?",
      answer:
        "Your usage-based plan bills only for active seats with confirmed benefits or completed sessions in the current billing cycle.",
    },
    {
      id: "faq-5",
      topic: "security",
      question: "How do I configure SSO for my organization?",
      answer:
        "Navigate to Integrations > Access & Security, select Okta or upload your SAML 2.0 metadata XML, and run Test Connection to verify the handshake.",
    },
    {
      id: "faq-6",
      topic: "employees",
      question: "What happens to an employee's care when they leave the company?",
      answer:
        "Offboarded employees enter the 30-day Grace Period automatically before deactivation, preserving continuity while halting future employer seat charges.",
    },
    {
      id: "faq-7",
      topic: "billing",
      question: "How do I download a specific invoice or receipt?",
      answer:
        "Go to Billing > Invoice History and click the download icon in the Actions column for any monthly statement, or Export CSV for the full table.",
    },
    {
      id: "faq-8",
      topic: "security",
      question: "Can I give different admins different levels of access?",
      answer:
        "Yes. Workspace Settings supports HR Manager, Billing Admin, and Read-Only Analyst roles with scoped access to financial and roster controls.",
    },
  ],
  resources: [
    {
      id: "handbook",
      title: "Employer Handbook",
      detail: "PDF · 48 pages · Updated Jun 2025",
      imageSrc: "/images/support/resource-handbook.png",
      href: "/analytics",
    },
    {
      id: "hris-guide",
      title: "HRIS Integration Guide",
      detail: "Docs · All HRIS platforms available",
      imageSrc: "/images/support/resource-hris.png",
      href: "/integrations",
    },
    {
      id: "hipaa-baa",
      title: "HIPAA BAA Agreement",
      detail: "Signed contract · Expires Jan 2027",
      imageSrc: "/images/support/resource-hipaa.png",
      href: "/billing",
    },
    {
      id: "soc2-report",
      title: "SOC 2 Type II Report",
      detail: "Compliance · Audited Feb 2026",
      imageSrc: "/images/support/resource-soc2.png",
      href: "/integrations",
    },
    {
      id: "api-docs",
      title: "API Documentation",
      detail: "Developer docs · REST & Webhooks",
      imageSrc: "/images/support/resource-api.png",
      href: "/integrations",
    },
    {
      id: "comm-toolkit",
      title: "Employee Comm. Toolkit",
      detail: "Templates · Emails, Slack, posters",
      imageSrc: "/images/support/resource-toolkit.png",
      href: "/employees",
    },
  ],
};
