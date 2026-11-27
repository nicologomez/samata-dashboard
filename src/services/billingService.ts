import { employerBillingFixture } from "@/data/employerBilling";
import type { EmployerBillingData } from "@/types/employerBilling";

export async function getEmployerBilling(): Promise<EmployerBillingData> {
  return structuredClone(employerBillingFixture);
}
