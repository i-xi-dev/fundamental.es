import { finite, safeint } from "../_typedef/_number.mts";
import { TypeMismatchError } from "../../../_internal/mod.mts";
import { uint8 } from "../_typedef/_uint.mts";

export function isFinite(test: unknown): test is finite {
  return Number.isFinite(test);
}

export function assertFinite(
  test: unknown,
  targetLabel: string,
): asserts test is finite {
  if (isFinite(test) !== true) {
    throw TypeMismatchError.finite(targetLabel);
  }
}

export function isSafeInt(test: unknown): test is safeint {
  return Number.isSafeInteger(test);
}

export function assertSafeInt(
  test: unknown,
  targetLabel: string,
): asserts test is safeint {
  if (isSafeInt(test) !== true) {
    throw TypeMismatchError.safeInt(targetLabel);
  }
}

export function isNonNegativeSafeInt(test: unknown): test is safeint {
  return isSafeInt(test) && (test >= 0);
}

export function assertNonNegativeSafeInt(
  test: unknown,
  targetLabel: string,
): asserts test is safeint {
  if (isNonNegativeSafeInt(test) !== true) {
    throw TypeMismatchError.nonNegativeSafeInt(targetLabel);
  }
}

function _inRange(test: safeint, min: safeint, max: safeint): boolean {
  return (test >= min) && (test <= max);
}

export function isUint8(test: unknown): test is uint8 {
  return isSafeInt(test) && _inRange(test, 0, 0xFF);
}

export function assertUint8(
  test: unknown,
  targetLabel: string,
): asserts test is uint8 {
  if (isUint8(test) !== true) {
    throw TypeMismatchError.uintN(8, targetLabel);
  }
}
