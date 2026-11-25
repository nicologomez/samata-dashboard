import type { IconName } from "@/components/ui/Icon";
import type { CareStatusLabel } from "@/types/employer";

export const careStatusIcons = {
  "Pending Access": "hourglass",
  "Active Benefits": "sun",
  "Grace Period": "leaf",
  Deactivated: "slash-octagon",
} as const satisfies Record<CareStatusLabel, IconName>;
