export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}
