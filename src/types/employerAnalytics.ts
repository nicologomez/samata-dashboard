import type {
  DonutSlice,
  FunnelStage,
  Metric,
  MetricTableRow,
  Period,
  SegmentedBarSegment,
  SelectOption,
  TrendPoint,
} from "./common";
import type { CareStatus } from "./employer";

export interface ProgramSignalView {
  readonly id: string;
  readonly label: string;
  readonly total: number;
  readonly caption: string;
  readonly segments: readonly SegmentedBarSegment[];
}

export type ParticipationTabId = "employees-sessions" | "new-returning";

export interface ParticipationTabData {
  readonly id: ParticipationTabId;
  readonly label: string;
  readonly primaryLabel: string;
  readonly secondaryLabel: string;
  readonly trendsByPeriod: Record<Period, readonly TrendPoint[]>;
}

export interface BenefitHealthPeriodData {
  readonly stages: readonly FunnelStage[];
  readonly rows: readonly MetricTableRow[];
}

export interface BookingSlotGrid {
  readonly peakLabel: string;
  readonly caption: string;
  readonly days: readonly string[];
  readonly hours: readonly string[];
  /** Intensity levels 0..4 per [hourIndex][dayIndex]. */
  readonly intensities: readonly (readonly number[])[];
  readonly maxLabel: string;
}

export interface SessionUtilizationPoint {
  readonly month: string;
  readonly used: number;
  readonly allocated: number;
}

export interface EmployerAnalyticsData {
  readonly wideMetricsByPeriod: Record<Period, readonly Metric[]>;
  readonly programSignals: readonly ProgramSignalView[];
  readonly participation: {
    readonly departments: readonly SelectOption[];
    readonly tabs: readonly ParticipationTabData[];
  };
  readonly care: readonly CareStatus[];
  readonly averageSetupDays: number;
  readonly activationRate: number;
  readonly onboardRate: number;
  readonly benefitHealth: {
    readonly dateRanges: readonly SelectOption[];
    readonly byPeriod: Record<Period, BenefitHealthPeriodData>;
  };
  readonly bookingPatterns: Record<Period, BookingSlotGrid>;
  readonly sessionUtilization: {
    readonly currentMonthLabel: string;
    readonly sessionsUsed: number;
    readonly planAllocated: number;
    readonly monthly: readonly SessionUtilizationPoint[];
  };
  readonly focusAreas: Record<Period, readonly DonutSlice[]>;
}
