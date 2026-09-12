import { TypeAlias } from "../../type/mod.mts";

//TODO 移動

export function isSurrogate(codePoint: TypeAlias.safeint): boolean {
  return (codePoint >= 0xD800) && (codePoint <= 0xDFFF);
}

export function isHighSurrogate(codePoint: TypeAlias.safeint): boolean {
  return (codePoint >= 0xD800) && (codePoint <= 0xDBFF);
}
