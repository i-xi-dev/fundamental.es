import { Type, TypeAlias } from "../type/mod.mts";

export function _isNonNegative(value: TypeAlias.finite | bigint): boolean {
  return (Type.isNumber(value) || Type.isBigInt(value)) && (value >= 0);
}
