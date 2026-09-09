import { _Type } from "../mod.mts";

//TODO 移動

export function isSurrogate(codePoint: _Type.safeint): boolean {
  //TODO isSafeInt &&
  return (codePoint >= 0xD800) && (codePoint <= 0xDFFF);
}

export function isHighSurrogate(codePoint: _Type.safeint): boolean {
  //TODO isSafeInt &&
  return (codePoint >= 0xD800) && (codePoint <= 0xDBFF);
}
