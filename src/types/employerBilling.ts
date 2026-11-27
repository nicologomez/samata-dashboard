import type { Metric, Period, SelectOption } from "./common";

export type InvoiceStatus = "ongoing" | "paid" | "overdue";

export type BillingTabId = "invoices" | "payment-method" | "contract";

export type SpendTrendRange = "12m" | "6m";

export interface BillingOverviewRow {
  readonly label: string;
  readonly value: string;
}

export interface BillingOverviewData {
  readonly subtitle: string;
  readonly rows: readonly BillingOverviewRow[];
  readonly secondaryActionLabel: string;
  readonly primaryActionLabel: string;
}

export interface SpendTrendPoint {
  readonly month: string;
  readonly spend: number;
  readonly budget: number;
}

export interface SpendTrendSummaryMetric {
  readonly label: string;
  readonly value: string;
}

export interface SpendTrendData {
  readonly monthlyBillingLabel: string;
  readonly monthlyBillingAmount: string;
  readonly budgetLimitLabel: string;
  readonly budgetLimitAmount: string;
  readonly rangeOptions: readonly SelectOption<SpendTrendRange>[];
  readonly points: readonly SpendTrendPoint[];
  readonly minScale: number;
  readonly maxScale: number;
  readonly yTicks: readonly number[];
  readonly bottomStats: readonly SpendTrendSummaryMetric[];
}

export interface SeatBreakdownItem {
  readonly label: string;
  readonly count: number;
  readonly note: string;
}

export interface SeatUtilizationData {
  readonly subtitle: string;
  readonly activeSeats: number;
  readonly totalCapacity: number;
  readonly caption: string;
  readonly breakdown: readonly SeatBreakdownItem[];
  readonly disclaimer: string;
}

export interface InvoiceRecord {
  readonly id: string;
  readonly invoiceNumber: string;
  readonly period: string;
  readonly seats: number;
  readonly amount: number;
  readonly status: InvoiceStatus;
  readonly date: string;
}

export interface PaymentMethodSummary {
  readonly brand: string;
  readonly last4: string;
  readonly expiry: string;
  readonly billingEmail: string;
  readonly autoPayEnabled: boolean;
}

export interface ContractTermsSummary {
  readonly agreementName: string;
  readonly pricingModel: string;
  readonly seatRate: string;
  readonly termPeriod: string;
  readonly renewalNotice: string;
}

export interface EmployerBillingData {
  readonly atAGlance: {
    readonly heading: string;
    readonly subtitle: string;
    readonly metricsByPeriod: Record<Period, readonly Metric[]>;
  };
  readonly overview: BillingOverviewData;
  readonly spendTrend: SpendTrendData;
  readonly seatUtilization: SeatUtilizationData;
  readonly invoices: readonly InvoiceRecord[];
  readonly totalInvoices: number;
  readonly paymentMethod: PaymentMethodSummary;
  readonly contractTerms: ContractTermsSummary;
}
