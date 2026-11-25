import type { IconName } from "@/components/ui/Icon";

export type Period = "daily" | "weekly" | "monthly";
export type Tone = "positive" | "negative" | "neutral";

export interface Metric {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly unit?: string;
  readonly change?: number;
  readonly tone: Tone;
  readonly note: string;
  readonly progress?: number;
}

export interface TrendPoint {
  readonly label: string;
  readonly participants: number;
  readonly sessions: number;
}

export interface QuickActionItem {
  readonly label: string;
  readonly detail: string;
  readonly href: string;
  readonly icon: IconName;
}
