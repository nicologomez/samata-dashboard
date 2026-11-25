import { dashboardFixture } from "@/data/dashboard";
import type { DashboardData, EmployerShellData } from "@/types/dashboard";

/** Lightweight shell payload for Sidebar and Header across all employer routes. */
export async function getEmployerShellData(): Promise<EmployerShellData> {
  return structuredClone({
    profile: dashboardFixture.profile,
    sessionUsage: dashboardFixture.sessionUsage,
  });
}

/** Full payload for the Employer Home dashboard route. */
export async function getEmployerDashboard(): Promise<DashboardData> {
  return structuredClone(dashboardFixture);
}
