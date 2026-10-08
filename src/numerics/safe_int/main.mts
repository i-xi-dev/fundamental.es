import {
  _isEvenSafeInt,
  _isNonNegativeSafeInt,
  _normalizeFinite,
  _roundToSafeInt,
} from "../_internal/common.mts";
import { _NumericTypeError } from "../_internal/type_error/mod.mts";
import { RoundingMode } from "../rounding_mode.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export { _isNonNegativeSafeInt as isNonNegative };

export function assertNonNegative(
  test: TypeAlias.safeint,
  targetLabel: string,
): void {
  if ((_isNonNegativeSafeInt(test)) !== true) {
    throw _NumericTypeError.mustBeNonNegativeSafeInteger(targetLabel);
  }
}

export { _isEvenSafeInt as isEven };

export function round(
  value: TypeAlias.finite,
  roundingMode?: RoundingMode,
): TypeAlias.safeint {
  TypeAlias.assertFinite(value, "Input");
  return _roundToSafeInt(value, roundingMode);
}
