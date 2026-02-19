export const formatCurrency = (value: number): string =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export function formatCurrencyFromInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  const number = Number(digits) / 100;
  return formatCurrency(number);
}

export function parseCurrencyToNumber(value: string): number {
  const digits = value.replace(/\D/g, "");
  return Number(digits) / 100;
}
