import { Exception } from "../../../_internal/mod.mts";
import { finite, safeint } from "../_typedef/_number.mts";
import { uint8 } from "../_typedef/_uint.mts";

export function isFinite(test: unknown): test is finite {
  return Number.isFinite(test);
}

export function isSafeInt(test: unknown): test is safeint {
  return Number.isSafeInteger(test);
}

export function assertSafeInt(
  test: unknown,
  targetLabel: string,
): asserts test is safeint {
  if (isSafeInt(test) !== true) {
    throw Exception.TypeMismatch.safeInt(targetLabel);
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
    throw Exception.TypeMismatch.nonNegativeSafeInt(targetLabel);
  }
}

function _inRange(test: safeint, min: safeint, max: safeint): boolean {
  return (test >= min) && (test <= max);
}

const _MIN_UINT = 0;
const _MAX_UINT8 = 0xFF;

export function isUint8(test: unknown): test is uint8 {
  return isSafeInt(test) && _inRange(test, _MIN_UINT, _MAX_UINT8);
}
