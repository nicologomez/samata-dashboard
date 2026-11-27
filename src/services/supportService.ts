import { employerSupportFixture } from "@/data/employerSupport";
import type { EmployerSupportData } from "@/types/employerSupport";

export async function getEmployerSupport(): Promise<EmployerSupportData> {
  return structuredClone(employerSupportFixture);
}
