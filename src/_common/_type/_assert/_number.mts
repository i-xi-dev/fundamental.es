import { _MAX_UINT8, _MIN_UINT } from "../_const.mts";
import { _uint8 } from "../_typedef/_uint8.mts";

function _isSafeInt(test: unknown): test is number {
  return Number.isSafeInteger(test);
}

function _inRange(test: number, min: number, max: number): boolean {
  return (test >= min) && (test <= max);
}

export function _isUint8(test: unknown): test is _uint8 {
  return _isSafeInt(test) && _inRange(test, _MIN_UINT, _MAX_UINT8);
}
