import {
  _assertChar32,
  _assertNonSurrogateCodePoint,
  _charsToBytes,
  _isChar32,
} from "../_internal/common.mts";
import { _isUint16 } from "../../numerics/_internal/common.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { RangeException } from "../../_internal/range_error/mod.mts";

// 孤立サロゲートを許容しない

export { _isChar32 as is };

export { _assertChar32 as assert };

export function fromCodePoint(
  codePoint: TypeAlias.codepoint,
): TypeAlias.char32 {
  _assertNonSurrogateCodePoint(codePoint, "Input");
  return String.fromCodePoint(codePoint);
}

export function toCodePoint(char: TypeAlias.char32): TypeAlias.codepoint {
  _assertChar32(char, "Input");
  return char.codePointAt(0)!;
}

//TODO fromBytes

// byteLengthは1～4になる
export function toBytes(char: TypeAlias.char32): TypeAlias.Bytes {
  _assertChar32(char, "Input");
  return _charsToBytes(char);
}

//XXX fromUint16s(...charCodes) の方が良いか？
export function fromUint16s(
  charCodes:
    /* [TypeAlias.uint16] | [TypeAlias.uint16, TypeAlias.uint16] */
    Array<TypeAlias.uint16>,
): TypeAlias.char32 {
  if (Array.isArray(charCodes) && charCodes.every((c) => _isUint16(c))) {
    if (charCodes.length <= 0) {
      throw RangeException.lengthTooShort("Input", 1);
    } else if (charCodes.length > 2) {
      throw RangeException.lengthTooLong("Input", 2);
    }

    if (charCodes.length === 1) {
      //TODO 孤立サロゲートはエラー
    }

    const result = String.fromCharCode(...charCodes);
    if (_isChar32(result) === true) {
      return result;
    }
    throw _TextualException.mustBeSurrogatePair("input");
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
