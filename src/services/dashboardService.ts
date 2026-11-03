import { dashboardFixture } from "@/data/dashboard";
import type { DashboardData } from "@/types/dashboard";

export async function getEmployerDashboard(): Promise<DashboardData> {
  return structuredClone(dashboardFixture);
}
