export function _isNumber(test: unknown): test is number {
  return (typeof test === "number");
}
