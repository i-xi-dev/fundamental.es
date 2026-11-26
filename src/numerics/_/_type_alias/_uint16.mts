import { _inNumericRange } from "../../../_/_.mts";
import { _mustBeUintN } from "../_type/_uint_n.mts";

export function _isUint16(test: number): boolean {
  return Number.isSafeInteger(test) && _inNumericRange(test, 0, 0xFFFF);
}

export function _assertUint16(test: number, label: string): void {
  if (_isUint16(test) !== true) {
    throw _mustBeUintN(16, label);
  }
}
