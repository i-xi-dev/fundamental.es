import {
  _assertChar32,
  _assertCodePoint,
  _isChar32,
} from "../_internal/common.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export { _isChar32 as is };

export { _assertChar32 as assert };

export function fromCodePoint(
  codePoint: TypeAlias.codepoint,
): TypeAlias.char32 {
  _assertCodePoint(codePoint, "Input");
  return String.fromCodePoint(codePoint);
}

export function toCodePoint(char: TypeAlias.char32): TypeAlias.codepoint {
  _assertChar32(char, "Input");
  return char.codePointAt(0)!;
}
