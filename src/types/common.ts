import type { IconName } from "@/components/ui/Icon";

export type Period = "daily" | "weekly" | "monthly";
export type Tone = "positive" | "negative" | "neutral";

export interface SelectOption<T extends string = string> {
  readonly value: T;
  readonly label: string;
}

export interface Metric {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly displayValue?: string;
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

export interface SegmentedBarSegment {
  readonly label: string;
  readonly value: number;
  readonly tone: "warning" | "orange" | "blue" | "brand";
}

export interface FunnelStage {
  readonly label: string;
  readonly value: number;
  readonly conversionPct?: number;
}

export interface MetricTableRow {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly current: number;
  readonly delta: string;
  readonly changePct: number;
  readonly tone: Tone;
  readonly sparkline: readonly number[];
  readonly href?: string;
}

export interface DonutSlice {
  readonly label: string;
  readonly percentage: number;
  readonly tone: "aqua" | "orange" | "blue" | "warning" | "brand";
}
