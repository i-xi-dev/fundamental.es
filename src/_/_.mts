function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function _mustBe(typeDesc: string, target: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function _inNumericRange(
  test: number | bigint,
  min: number | bigint,
  max: number | bigint,
): boolean {
  return (test >= min) && (test <= max);
}
