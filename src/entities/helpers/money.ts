import { ColumnOptions } from "typeorm";

// Postgres returns numeric columns as strings, so we turn them back into numbers.
// precision 12 / scale 2 keeps money values to 2 decimal places.
export const moneyColumn: ColumnOptions = {
  type: "numeric",
  precision: 12,
  scale: 2,
  transformer: {
    to: (value: number) => value,
    from: (value: string | null) => (value === null ? null : Number(value)),
  },
};

// Money math is done in cents (integers) to avoid floating point errors.
export const toCents = (value: number) => Math.round(value * 100);
export const fromCents = (cents: number) => cents / 100;

// Biggest value that fits in numeric(12,2).
export const MAX_MONEY = 9999999999.99;

// Positive number with at most 2 decimal places.
export function isValidAmount(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value > 0 &&
    value <= MAX_MONEY &&
    Number(value.toFixed(2)) === value
  );
}
