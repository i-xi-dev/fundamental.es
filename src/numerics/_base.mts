import { _T } from "../_common/mod.mts";

export function _isNonNegative(value: _T.finite | bigint): boolean {
  return (_T.isNumber(value) || _T.isBigInt(value)) && (value >= 0);
}
