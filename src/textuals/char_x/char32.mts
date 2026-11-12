import type { _char32, _codepoint } from "../_/_type_alias/_def/_defs.mts";
import { _assertChar32, _isChar32 } from "../_/_type_alias/_char32.mts";
import {
  _assertNonSurrogateCodePoint,
  _isNonSurrogateCodePoint,
} from "../_internal/common.mts";
import { _isUint16 } from "../../numerics/_internal/common.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { _Utf8 } from "../../_internal/_utf8/mod.mts";
import { RangeException } from "../../_internal/range_error/mod.mts";
import { Type } from "../../type/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

// 孤立サロゲートを許容しない

export function fromCodePoint(codePoint: _codepoint): _char32 {
  _assertNonSurrogateCodePoint(codePoint, "Input");
  return String.fromCodePoint(codePoint);
}

export function toCodePoint(char: _char32): _codepoint {
  _assertChar32(char, "Input");
  return char.codePointAt(0)!;
}

export function fromBytes(bytes: TypeAlias.Bytes): _char32 {
  Type.assertNonSharedUint8Array(bytes, "Input");
  if ((bytes.byteLength > 0) && (bytes.byteLength <= 4)) {
    let t: string;
    try {
      t = _Utf8.decode(bytes, true, true);
    } catch {
      throw RangeException.of(
        "Input must be a valid UTF-8 encoded byte sequence",
      );
    }
    if (_isChar32(t) === true) {
      return t;
    }
    throw RangeException.of(
      "Input must be a valid UTF-8 encoded byte sequence representing a well-formed single character",
    );
  }
  throw RangeException.of(
    "Input must be a byte sequence consisting of 1 to 4 bytes",
  );
}

// byteLengthは1～4になる
export function toBytes(char: _char32): TypeAlias.Bytes {
  _assertChar32(char, "Input");
  return _Utf8.encode(char, false); // 孤立サロゲートは_assertChar32で弾いているので第2引数はfalseで良い
}

//XXX fromUint16s(...charCodes) の方が良いか？
export function fromUint16s(
  charCodes:
    /* [TypeAlias.uint16] | [TypeAlias.uint16, TypeAlias.uint16] */
    Array<TypeAlias.uint16>,
): _char32 {
  if (Array.isArray(charCodes) && charCodes.every((c) => _isUint16(c))) {
    if (charCodes.length <= 0) {
      throw RangeException.lengthTooShort("Input", 1);
    } else if (charCodes.length > 2) {
      throw RangeException.lengthTooLong("Input", 2);
    }

    if (charCodes.length === 1) {
      const [charCode] = charCodes;
      if (_isNonSurrogateCodePoint(charCode) === false) {
        throw RangeException.of("Input must not be a lone surrogate");
      }
      return String.fromCharCode(charCode);
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
  char: _char32,
): [TypeAlias.uint16] | [TypeAlias.uint16, TypeAlias.uint16] {
  _assertChar32(char, "Input");

  const codePoint = char.codePointAt(0)!;
  if (codePoint <= 0xFFFF) {
    return [codePoint];
  }

  return [char.charCodeAt(0), char.charCodeAt(1)];
}
