export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}
