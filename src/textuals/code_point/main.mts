import type { _codeplane } from "../_/_type/_def/_code_plane.mts";
import type { _codepoint } from "../_/_type_alias/_def/_defs.mts";
import {
  _assertCodePoint,
  _isCodePoint,
} from "../_/_type_alias/_code_point.mts";
// import { _BLOCK_RANGE } from "../code_block/_range.mts";
import { _isUint16 } from "../../numerics/_internal/common.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { Char8 } from "../char_x/mod.mts";
import { Radix } from "../../numerics/mod.mts";
import { RangeException } from "../../_internal/range_error/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export * from "./_const.mts";

export function toString(codePoint: _codepoint): string {
  _assertCodePoint(codePoint, "Input");
  return `U+${
    codePoint.toString(Radix.HEXADECIMAL).toUpperCase().padStart(
      4,
      Char8.DIGIT_ZERO,
    )
  }`;
}

export function codePlaneOf(codePoint: _codepoint): _codeplane {
  _assertCodePoint(codePoint, "Input");
  return Math.trunc(codePoint / 0x10000) as _codeplane;
}

// export function codeBlockOf(codePoint: _codepoint): string {
//   _assertCodePoint(codePoint, "Input");
//   for (const [blockName, range] of Object.entries(_BLOCK_RANGE)) {
//     if ((codePoint >= range[0]) && (codePoint <= range[1])) {
//       return blockName;
//     }
//   }
//   return "No_Block";
// }

//TODO fromBytes

//TODO export function toBytes(codePoint: _codepoint): TypeAlias.Bytes {
//   _assertCodePoint(codePoint, "Input");

//   if (codePoint < 0x80) {
//     return Uint8Array.of(codePoint);
//   } else if (codePoint < 0x800) {
//   } else if (codePoint < 0x10000) {
//   } else {
//   }
// }

//XXX fromUint16s(...charCodes) の方が良いか？
export function fromUint16s(
  charCodes:
    /* [TypeAlias.uint16] | [TypeAlias.uint16, TypeAlias.uint16] */
    Array<TypeAlias.uint16>,
): _codepoint {
  if (Array.isArray(charCodes) && charCodes.every((c) => _isUint16(c))) {
    if (charCodes.length <= 0) {
      throw RangeException.lengthTooShort("Input", 1);
    } else if (charCodes.length > 2) {
      throw RangeException.lengthTooLong("Input", 2);
    }

    if (charCodes.length === 1) {
      return charCodes[0];
    }

    const [h, l] = charCodes;
    if (isHighSurrogate(h) && isLowSurrogate(l)) {
      return ((h - 0xD800) << 10) + (l - 0xDC00) + 0x10000;
    }

    throw _TextualException.mustBeSurrogatePair("input");
  } else {
    throw TypeAlias.Exception.mustBeArrayOfUintN(16, "Input");
  }
}

export function toUint16s(
  codePoint: _codepoint,
): [TypeAlias.uint16] | [TypeAlias.uint16, TypeAlias.uint16] {
  _assertCodePoint(codePoint, "Input");
  if (codePoint <= 0xFFFF) {
    return [codePoint];
  }

  const p = codePoint - 0x10000;
  const highSurrogate = (p >> 10) + 0xD800;
  const lowSurrogate = (p & 0x3FF) + 0xDC00;
  return [highSurrogate, lowSurrogate];
}

// -------------------------------------------------------------------
// shortcuts
// -------------------------------------------------------------------

function _inRanges(
  codePoint: _codepoint,
  ranges: Array<[min: _codepoint, max: _codepoint]>,
): boolean {
  if (_isCodePoint(codePoint) !== true) {
    return false;
  }
  return ranges.some((range) =>
    (codePoint >= range[0]) && (codePoint <= range[1])
  );
}

// shortcut of ```CodePointRange.fromCodePlane(CodePlane.BMP).contains(codePoint)```
export function inBmp(codePoint: _codepoint): boolean {
  return _inRanges(codePoint, [[0, 0xFFFF]]);
}

export function isHighSurrogate(codePoint: _codepoint): boolean {
  return _inRanges(codePoint, [[0xD800, 0xDBFF]]);
}

export function isLowSurrogate(codePoint: _codepoint): boolean {
  return _inRanges(codePoint, [[0xDC00, 0xDFFF]]);
}

// shortcut of ```isHighSurrogate(codePoint) || isLowSurrogate(codePoint)```
export function isSurrogate(codePoint: _codepoint): boolean {
  return _inRanges(codePoint, [[0xD800, 0xDFFF]]);
}

const _VS: [number, number] = [0xFE00, 0xFE0F];
const _VSS: [number, number] = [0xE0100, 0xE01EF];
const _MONGOLIAN_VS: [number, number] = [0x180B, 0x180F];
export function isVariationSelector(codePoint: _codepoint): boolean {
  return _inRanges(codePoint, [
    _VS,
    _VSS,
    _MONGOLIAN_VS,
  ]);
}
