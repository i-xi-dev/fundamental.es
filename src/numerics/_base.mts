import * as Type from "../type/mod.mts";
import * as TypeAlias from "../_internal/type_alias/mod.mts";

export function _isNonNegative(value: TypeAlias.finite | bigint): boolean {
  return (Type.isNumber(value) || Type.isBigInt(value)) && (value >= 0);
}
