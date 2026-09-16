import { TypeAlias } from "../../type/mod.mts";

//TODO 移動

const _HIGH_SURROGATE = /^[\uD800-\uDBFF]$/;

export function isHighSurrogate(rune: TypeAlias.rune): boolean {
  //TODO isString &&
  return _HIGH_SURROGATE.test(rune);
}
