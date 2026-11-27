function _typeErrorMessage(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function _mustBe(typeDesc: string, target: string): TypeError {
  const msg = _typeErrorMessage(target, typeDesc);
  return new TypeError(msg);
}

export function _isNullOrUndefined(test: unknown): test is null | undefined {
  return (test === null) || (test === undefined);
}

export function _inNumericRange(
  test: number | bigint,
  min: number | bigint,
  max: number | bigint,
): boolean {
  return (test >= min) && (test <= max);
}
