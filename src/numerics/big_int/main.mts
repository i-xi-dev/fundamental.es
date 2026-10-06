import { _clampBigInt } from "../_base.mts";
import { _Error } from "../../_common/mod.mts";
import { Type } from "../../type/mod.mts";

export function clamp<T extends bigint>(
  value: bigint,
  min: T,
  max: T,
): T {
  Type.assertBigInt(value, "Input");
  Type.assertBigInt(min, "Lower bound");
  Type.assertBigInt(max, "Upper bound");
  if (min > max) {
    throw _Error.Range.contradictory();
  }

  return _clampBigInt<T>(value, min, max);
}
