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
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export { _isSafeInt as is };

export { _assertSafeInt as assert };

export { _isNonNegativeSafeInt as isNonNegative };

export function assertNonNegative(
  test: TypeAlias.safeint,
  targetLabel: string,
): void {
  if ((_isNonNegativeSafeInt(test)) !== true) {
    throw _NumericException.mustBeNonNegativeSafeInteger(targetLabel);
  }
}

export { _isEvenSafeInt as isEven };

export function round(
  value: TypeAlias.finite,
  roundingMode?: RoundingMode,
): TypeAlias.safeint {
  _assertFinite(value, "Input");
  return _roundToSafeInt(value, roundingMode);
}
