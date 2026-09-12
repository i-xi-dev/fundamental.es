import { _Type } from "../_common/mod.mts";
import { Type } from "../type/mod.mts";

export function _isNonNegative(value: _Type.finite | bigint): boolean {
  return (Type.isNumber(value) || Type.isBigInt(value)) && (value >= 0);
}
