import type { _char32 } from "../../textuals/_type_alias/_def/_defs.mts";

//TODO 移動

const _HIGH_SURROGATE = /^[\uD800-\uDBFF]$/;

export function isHighSurrogate(rune: _char32): boolean {
  //TODO isString &&
  return _HIGH_SURROGATE.test(rune);
}
