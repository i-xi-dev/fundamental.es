import type { _safeint } from "../_type_alias/_def/_defs.mts";
import type { _uint7 } from "./_def/_uint7.mts";
import { _mustBeUintN } from "./_uint_n.mts";
import { __inRange } from "../../../type/check.mts";

export function _isUint7(test: unknown): test is _uint7 {
  return Number.isSafeInteger(test) && __inRange(test as _safeint, 0, 0x7F);
}

export function _assertUint7(
  test: unknown,
  label: string,
): asserts test is _uint7 {
  if (_isUint7(test) !== true) {
    throw _mustBeUintN(7, label);
  }
}
