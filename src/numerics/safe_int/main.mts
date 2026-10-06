import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import * as NumericTypeAssert from "../_type_ext/assert.mts";
import * as Exception from "../_type_ext/error.mts";
import {
  _isEvenSafeInt,
  _isNonNegativeSafeInt,
  _roundToSafeInt,
} from "../_base.mts";
import { _normalizeFinite } from "../finite.mts";
import { RoundingMode } from "../rounding_mode.mts";

export function assertSafeInteger(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isSafeInteger(test) !== true) {
    throw Exception.mustBeSafeInt(targetLabel);
  }
}

export { _isNonNegativeSafeInt as isNonNegative };

export function assertNonNegative(
  test: TypeAlias.safeint,
  targetLabel: string,
): void {
  if ((_isNonNegativeSafeInt(test)) !== true) {
    throw Exception.mustBeNonNegativeSafeInt(targetLabel);
  }
}

export { _isEvenSafeInt as isEven };

export function round(
  value: TypeAlias.finite,
  roundingMode?: RoundingMode,
): TypeAlias.safeint {
  NumericTypeAssert.finite(value, "Input");
  return _roundToSafeInt(value, roundingMode);
}
