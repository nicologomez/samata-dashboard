import type { IconName } from "@/components/ui/Icon";
import type { Metric } from "./common";

export type ActivityLogFilter = "hris" | "sso" | "api";

export type ActivityTrendTone = "success" | "warning" | "error";

export type IntegrationCatalogCategory = "hris" | "sso" | "api";

export interface IntegrationMiniStat {
  readonly label: string;
  readonly value: string;
}

export interface ConnectedIntegrationCardData {
  readonly id: string;
  readonly sectionTitle: string;
  readonly sectionIcon: IconName;
  readonly providerName: string;
  readonly categorySubtitle: string;
  readonly logoSrc: string;
  readonly shelfTone: "aqua" | "success";
  readonly stats: readonly IntegrationMiniStat[];
  readonly statusLabel: string;
  readonly secondaryActionLabel: string;
  readonly primaryActionLabel: string;
}

export interface QuickActionsPanelData {
  readonly statusMessage: string;
  readonly autoSyncTitle: string;
  readonly autoSyncSubtitle: string;
  readonly autoSyncDefaultEnabled: boolean;
  readonly testTitle: string;
  readonly testSubtitle: string;
  readonly testActionLabel: string;
  readonly viewActivityLabel: string;
  readonly contactUsLabel: string;
}

export interface ActivityEmployeeDelta {
  readonly id: string;
  readonly name: string;
  readonly employmentType: string;
  readonly changeLabel: string;
  readonly tone: "success" | "error" | "warning";
}

export interface IntegrationLogEntry {
  readonly id: string;
  readonly category: ActivityLogFilter;
  readonly dateLabel: string;
  readonly timeLabel: string;
  readonly type: "Scheduled" | "Manual" | "Webhook" | "SSO";
  readonly recordsCount: number;
  readonly changesSummary: string;
  readonly trendLabel: string;
  readonly trendTone: ActivityTrendTone;
  readonly statusSummaryTitle: string;
  readonly statusSummaryDetail: string;
  readonly employeeDeltas: readonly ActivityEmployeeDelta[];
}

export interface AvailableIntegrationItem {
  readonly id: string;
  readonly name: string;
  readonly categoryLabel: string;
  readonly category: IntegrationCatalogCategory;
  readonly description: string;
  readonly logoSrc?: string;
  readonly logoSize?: "sm" | "md" | "full";
  readonly connected: boolean;
}

export interface EmployerIntegrationsData {
  readonly atAGlance: {
    readonly heading: string;
    readonly subtitle: string;
    readonly metrics: readonly Metric[];
  };
  readonly quickActions: QuickActionsPanelData;
  readonly connections: readonly ConnectedIntegrationCardData[];
  readonly activityLogs: readonly IntegrationLogEntry[];
  readonly availableIntegrations: readonly AvailableIntegrationItem[];
}
