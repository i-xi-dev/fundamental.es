import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import * as NumericTypeAssert from "../_type_ext/assert.mts";
import {
  _isEvenSafeInt,
  _isNonNegativeSafeInt,
  _roundToSafeInt,
} from "../_base.mts";
import { _normalizeFinite } from "../finite.mts";
import { RoundingMode } from "../rounding_mode.mts";

export { _isNonNegativeSafeInt as isNonNegative };
export { _isEvenSafeInt as isEven };

export function round(
  value: TypeAlias.finite,
  roundingMode?: RoundingMode,
): TypeAlias.safeint {
  NumericTypeAssert.finite(value, "Input");
  return _roundToSafeInt(value, roundingMode);
}
