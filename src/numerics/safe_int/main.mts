import type { _finite, _safeint } from "../_/_type_alias/_def/_defs.mts";
import {
  _assertFinite,
  _assertSafeInt,
  _isEvenSafeInt,
  _isNonNegativeSafeInt,
  _isSafeInt,
  _normalizeFinite,
  _roundToSafeInt,
} from "../_internal/common.mts";
import { _NumericException } from "../_internal/error/mod.mts";
import { RoundingMode } from "../rounding_mode.mts";

export { _isSafeInt as is };

export { _assertSafeInt as assert };

export { _isNonNegativeSafeInt as isNonNegative };

export function assertNonNegative(
  test: _safeint,
  targetLabel: string,
): void {
  if ((_isNonNegativeSafeInt(test)) !== true) {
    throw _NumericException.mustBeNonNegativeSafeInteger(targetLabel);
  }
}

export { _isEvenSafeInt as isEven };

export function round(
  value: _finite,
  roundingMode?: RoundingMode,
): _safeint {
  _assertFinite(value, "Input");
  return _roundToSafeInt(value, roundingMode);
}
