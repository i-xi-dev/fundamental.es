import { _assertBigInteger } from "../../_/_type/_bigint.mts";
import { _clampBigInt } from "../_internal/common.mts";
import { RangeException } from "../../_internal/range_error/mod.mts";

export function clamp<T extends bigint>(
  value: bigint,
  min: T,
  max: T,
): T {
  _assertBigInteger(value, "Input");
  _assertBigInteger(min, "Lower bound");
  _assertBigInteger(max, "Upper bound");
  if (min > max) {
    throw RangeException.rangeInvalid();
  }

  return _clampBigInt<T>(value, min, max);
}
