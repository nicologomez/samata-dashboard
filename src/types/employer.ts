import type { Metric, Period, TrendPoint } from "./common";

export type CareStatusLabel =
  | "Pending Access"
  | "Active Benefits"
  | "Grace Period"
  | "Deactivated";

export interface DashboardTask {
  readonly id: string;
  readonly title: string;
  readonly detail: string;
  readonly age: string;
  readonly action: "remind" | "sync";
  readonly href: string;
}

export interface CareStatus {
  readonly label: CareStatusLabel;
  readonly count: number;
}

export interface EmployerProfile {
  readonly company: string;
  readonly domain: string;
  readonly plan: string;
  readonly user: string;
  readonly role: string;
  readonly syncConnected: boolean;
}

export interface EmployerDashboardData {
  readonly profile: EmployerProfile;
  readonly metricsByPeriod: Record<Period, readonly Metric[]>;
  readonly trendsByPeriod: Record<Period, readonly TrendPoint[]>;
  readonly care: readonly CareStatus[];
  readonly activationRate: number;
  readonly onboardRate: number;
  readonly averageSetupDays: number;
  readonly tasks: readonly DashboardTask[];
  readonly sessionUsage: { readonly used: number; readonly limit: number };
}

export type EmployerShellData = Pick<
  EmployerDashboardData,
  "profile" | "sessionUsage"
>;
