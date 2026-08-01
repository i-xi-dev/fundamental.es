import { _Type } from "../_common/mod.mts";

export function _isNonNegative(value: _Type.finite | bigint): boolean {
  return (_Type.isNumber(value) || _Type.isBigInt(value)) && (value >= 0);
}
