import type { Metric, Period } from "./common";
import type { EmployerDashboardData } from "./employer";

export type EmployeeStatus = "active" | "pending" | "grace-period" | "deactivated";

export interface EmployeeRecord {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly employment?: string;
  readonly annualSessions?: number;
  readonly location?: string;
  readonly status: EmployeeStatus;
  readonly renewalDate?: string;
}

export type AccessSummaryData = Pick<
  EmployerDashboardData,
  "care" | "averageSetupDays"
>;

export interface EmployerEmployeesData {
  readonly companyName: string;
  readonly summaryNote: string;
  readonly metricsByPeriod: Record<Period, readonly Metric[]>;
  readonly accessSummary: AccessSummaryData;
  readonly employees: readonly EmployeeRecord[];
  readonly totalEmployees: number;
}
