import { employerEmployeesFixture } from "@/data/employerEmployees";
import type { EmployerEmployeesData } from "@/types/employerEmployees";

/** Full payload for the Employer Employees route. */
export async function getEmployerEmployees(): Promise<EmployerEmployeesData> {
  return structuredClone(employerEmployeesFixture);
}
