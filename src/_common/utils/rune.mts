import { _Type } from "../mod.mts";

//TODO 移動

const _HIGH_SURROGATE = /^[\uD800-\uDBFF]$/;

export function isHighSurrogate(rune: _Type.rune): boolean {
  //TODO isString &&
  return _HIGH_SURROGATE.test(rune);
}
