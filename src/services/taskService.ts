import type { DashboardTask } from "@/types/dashboard";

export type TaskResult = { readonly ok: true; readonly message: string };

export async function runDemoTask(
  action: DashboardTask["action"],
): Promise<TaskResult> {
  if (action === "remind")
    return {
      ok: true,
      message: "Demo: reminder prepared. No employee was contacted.",
    };
  return {
    ok: true,
    message:
      "Demo: connection check prepared. No HRIS synchronization occurred.",
  };
}
