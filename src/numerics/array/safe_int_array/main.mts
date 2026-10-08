import * as _TypeError from "../../../_common/_error/type.mts";

export function isSafeIntegerArray(test: unknown): boolean {
  return Array.isArray(test) && test.every((i) => Number.isSafeInteger(i));
}

export function assertSafeIntegerArray(
  test: unknown,
  targetLabel: string,
): void {
  if (isSafeIntegerArray(test) !== true) {
    throw _TypeError.mustBeSafeIntArray(targetLabel);
  }
}
