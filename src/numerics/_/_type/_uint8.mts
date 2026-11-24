import type { _safeint } from "../_type_alias/_def/_defs.mts";
import type { _uint8 } from "./_def/_uint8.mts";
import { _mustBeUintN } from "./_uint_n.mts";
import { __inRange } from "../../../type/check.mts";

export function _isUint8(test: unknown): test is _uint8 {
  return Number.isSafeInteger(test) && __inRange(test as _safeint, 0, 0xFF);
}

export function _assertUint8(
  test: unknown,
  label: string,
): asserts test is _uint8 {
  if (_isUint8(test) !== true) {
    throw _mustBeUintN(8, label);
  }
}
