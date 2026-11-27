import { employerIntegrationsFixture } from "@/data/employerIntegrations";
import type { EmployerIntegrationsData } from "@/types/employerIntegrations";

export async function getEmployerIntegrations(): Promise<EmployerIntegrationsData> {
  return structuredClone(employerIntegrationsFixture);
}
