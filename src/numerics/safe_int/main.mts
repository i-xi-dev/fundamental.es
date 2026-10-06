import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import {
  _isEvenSafeInt,
  _isNonNegativeSafeInt,
  _normalizeFinite,
  _roundToSafeInt,
} from "../_internal/common.mts";
import { _NumericTypeError } from "../_internal/type_error/mod.mts";
import { Finite } from "../finite/mod.mts";
import { RoundingMode } from "../rounding_mode.mts";

export function assertSafeInteger(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isSafeInteger(test) !== true) {
    throw _NumericTypeError.mustBeSafeInteger(targetLabel);
  }
}

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
  Finite.assertFinite(value, "Input");
  return _roundToSafeInt(value, roundingMode);
}
