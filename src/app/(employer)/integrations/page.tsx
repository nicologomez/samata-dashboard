import type { Metadata } from "next";
import { getEmployerIntegrations } from "@/services/integrationsService";
import { EmployerIntegrationsView } from "@/views/employer/EmployerIntegrationsView";

export const metadata: Metadata = { title: "Integrations" };

export default async function IntegrationsPage() {
  const data = await getEmployerIntegrations();
  return <EmployerIntegrationsView data={data} />;
}
