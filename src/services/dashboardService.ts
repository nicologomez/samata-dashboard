import { employerDashboardFixture } from "@/data/employerDashboard";
import type {
  EmployerDashboardData,
  EmployerShellData,
} from "@/types/employer";

/** Lightweight shell payload for Sidebar and Header across all employer routes. */
export async function getEmployerShellData(): Promise<EmployerShellData> {
  return structuredClone({
    profile: employerDashboardFixture.profile,
    sessionUsage: employerDashboardFixture.sessionUsage,
  });
}

/** Full payload for the Employer Home dashboard route. */
export async function getEmployerDashboard(): Promise<EmployerDashboardData> {
  return structuredClone(employerDashboardFixture);
}
