import { _MAX_UINT8, _MIN_UINT } from "../_const.mts";
import { _finite, _safeint } from "../_typedef/_number.mts";
import { _uint8 } from "../_typedef/_uint.mts";

export function _isFinite(test: unknown): test is _finite {
  return Number.isFinite(test);
}

export function _isSafeInt(test: unknown): test is _safeint {
  return Number.isSafeInteger(test);
}

function _inRange(test: _safeint, min: _safeint, max: _safeint): boolean {
  return (test >= min) && (test <= max);
}

export function _isUint8(test: unknown): test is _uint8 {
  return _isSafeInt(test) && _inRange(test, _MIN_UINT, _MAX_UINT8);
}
