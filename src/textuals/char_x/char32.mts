import {
  _assertChar32,
  _assertCodePoint,
  _isChar32,
} from "../_internal/common.mts";
import { _isUint16 } from "../../numerics/_internal/common.mts";
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

//TODO fromBytes
//     toBytes

export function fromUint16s(
  charCodes: [TypeAlias.uint16] | [TypeAlias.uint16, TypeAlias.uint16],
): TypeAlias.char32 {
  if (Array.isArray(charCodes) && charCodes.every((c) => _isUint16(c))) {
    if ((charCodes.length > 0) && (charCodes.length <= 2)) {
      return String.fromCharCode(...charCodes);
    } else {
      throw new Error("TODO must be array of 1 or 2 uint16");
    }
  } else {
    throw TypeAlias.Exception.mustBeArrayOfUintN(16, "Input");
  }
}

export function toUint16s(
  char: TypeAlias.char32,
): [TypeAlias.uint16] | [TypeAlias.uint16, TypeAlias.uint16] {
  _assertChar32(char, "Input");

  const codePoint = char.codePointAt(0)!;
  if (codePoint <= 0xFFFF) {
    return [codePoint];
  }

  return [char.charCodeAt(0), char.charCodeAt(1)];
}
