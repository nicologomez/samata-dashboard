import { employerAnalyticsFixture } from "@/data/employerAnalytics";
import type { EmployerAnalyticsData } from "@/types/employerAnalytics";

/** Full payload for the Employer Analytics route. */
export async function getEmployerAnalytics(): Promise<EmployerAnalyticsData> {
  return structuredClone(employerAnalyticsFixture);
}
