import type { Metadata } from "next";
import { getEmployerBilling } from "@/services/billingService";
import { EmployerBillingView } from "@/views/employer/EmployerBillingView";

export const metadata: Metadata = { title: "Billing" };

export default async function BillingPage() {
  const data = await getEmployerBilling();
  return <EmployerBillingView data={data} />;
}
