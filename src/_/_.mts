export function _inNumericRange(
  test: number | bigint,
  min: number | bigint,
  max: number | bigint,
): boolean {
  return (test >= min) && (test <= max);
}
