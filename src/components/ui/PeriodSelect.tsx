"use client";

import type { Period, SelectOption } from "@/types/common";
import { Select } from "./Select";

const periodOptions: readonly SelectOption<Period>[] = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
];

type Props = {
  label: string;
  value: Period;
  onChange: (value: Period) => void;
};

/** Period selector composing the universal hug-content Select primitive. */
export function PeriodSelect({ label, value, onChange }: Props) {
  return (
    <Select
      label={label}
      value={value}
      options={periodOptions}
      onChange={onChange}
    />
  );
}
