import type { IconName } from "@/components/ui/Icon";
import type { PillTone } from "@/components/ui/Pill";

export type TicketStatus = "open" | "pending" | "resolved";
export type TicketPriority = "high" | "medium" | "low";
export type TicketTabId = "all" | TicketStatus;

export type FaqTopicId =
  | "all"
  | "billing"
  | "employees"
  | "integrations"
  | "security"
  | "clinical";

export interface SupportShortcut {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName;
  readonly targetId: string;
}

export interface SupportHeroData {
  readonly sectionTitle: string;
  readonly heading: string;
  readonly subtitle: string;
  readonly searchPlaceholder: string;
  readonly shortcuts: readonly SupportShortcut[];
}

export interface SupportContactAction {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly icon: IconName;
}

export interface CustomerSuccessManagerData {
  readonly name: string;
  readonly avatarSrc: string;
  readonly statusText: string;
  readonly email: string;
  readonly actions: readonly SupportContactAction[];
}

export interface SupportTicketRecord {
  readonly id: string;
  readonly ticketCode: string;
  readonly subject: string;
  readonly latestReply: string;
  readonly priority: TicketPriority;
  readonly category: string;
  readonly categoryTone: PillTone;
  readonly updatedAtLabel: string;
  readonly status: TicketStatus;
}

export interface SystemServiceStatus {
  readonly id: string;
  readonly name: string;
  readonly statusLabel: string;
  readonly tone: "success" | "warning" | "error";
}

export interface AccountHealthRow {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly dotTone?: "success" | "warning";
}

export interface FaqItem {
  readonly id: string;
  readonly topic: Exclude<FaqTopicId, "all">;
  readonly question: string;
  readonly answer: string;
}

export interface SupportResourceItem {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly imageSrc: string;
  readonly href: string;
}

export interface EmployerSupportData {
  readonly hero: SupportHeroData;
  readonly csm: CustomerSuccessManagerData;
  readonly tickets: readonly SupportTicketRecord[];
  readonly totalTickets: number;
  readonly systemStatuses: readonly SystemServiceStatus[];
  readonly lastCheckedLabel: string;
  readonly accountHealth: readonly AccountHealthRow[];
  readonly faqs: readonly FaqItem[];
  readonly resources: readonly SupportResourceItem[];
}
