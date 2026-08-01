import { _TypeError } from "../../../_internal/mod.mts";
import { finite, safeint } from "../_typedef/_number.mts";
import { uint8 } from "../_typedef/_uint.mts";

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isFinite(test: unknown): test is finite {
  return Number.isFinite(test);
}

export function isSafeInt(test: unknown): test is safeint {
  return Number.isSafeInteger(test);
} //TODO 「test is safeint」だと偽だった場合にnumber型ではないことにされてしまう

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
    throw _TypeError.uintN(8, targetLabel);
  }
}
