import { _MAX_UINT8, _MIN_UINT } from "../_const.mts";
import { finite, safeint } from "../_typedef/_number.mts";
import { uint8 } from "../_typedef/_uint.mts";

export function isFinite(test: unknown): test is finite {
  return Number.isFinite(test);
}

export function isSafeInt(test: unknown): test is safeint {
  return Number.isSafeInteger(test);
}

function _inRange(test: safeint, min: safeint, max: safeint): boolean {
  return (test >= min) && (test <= max);
}

export function isUint8(test: unknown): test is uint8 {
  return isSafeInt(test) && _inRange(test, _MIN_UINT, _MAX_UINT8);
}
