import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { _assertCodePoint, _isCodePoint } from "../_internal/common.mts";
// import { _BLOCK_RANGE } from "../code_block/_range.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { Char8 } from "../char_x/mod.mts";
import { Radix } from "../../numerics/mod.mts";
import { Type } from "../../type/mod.mts";

export * from "./_const.mts";

export { _isCodePoint as is };

export { _assertCodePoint as assert };

export function toString(codePoint: TypeAlias.codepoint): string {
  _assertCodePoint(codePoint, "Input");
  return `U+${
    codePoint.toString(Radix.HEXADECIMAL).toUpperCase().padStart(
      4,
      Char8.DIGIT_ZERO,
    )
  }`;
}

export function codePlaneOf(codePoint: TypeAlias.codepoint): Type.codeplane {
  _assertCodePoint(codePoint, "Input");
  return Math.trunc(codePoint / 0x10000) as Type.codeplane;
}

// export function codeBlockOf(codePoint: TypeAlias.codepoint): string {
//   _assertCodePoint(codePoint, "Input");
//   for (const [blockName, range] of Object.entries(_BLOCK_RANGE)) {
//     if ((codePoint >= range[0]) && (codePoint <= range[1])) {
//       return blockName;
//     }
//   }
//   return "No_Block";
// }

// export function fromUint16s(
//   ...uint16s: Array<TypeAlias.uint16>
// ): TypeAlias.codepoint {
//   if ((uint16s.length > 0) && (uint16s.length <= 2)) {
//     if (uint16s.every((code) => _isUint16(code)) !== true) {
//       throw new Error("TODO");
//     }

//     return xxx;
//   }

//   throw new Error("TODO");
// }

export function toUint16s(
  codePoint: TypeAlias.codepoint,
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
  codePoint: TypeAlias.codepoint,
  ranges: Array<[min: TypeAlias.codepoint, max: TypeAlias.codepoint]>,
): boolean {
  if (_isCodePoint(codePoint) !== true) {
    return false;
  }
  return ranges.some((range) =>
    (codePoint >= range[0]) && (codePoint <= range[1])
  );
}

// shortcut of ```CodePointRange.fromCodePlane(CodePlane.BMP).contains(codePoint)```
export function inBmp(codePoint: TypeAlias.codepoint): boolean {
  return _inRanges(codePoint, [[0, 0xFFFF]]);
}

export function isHighSurrogate(codePoint: TypeAlias.codepoint): boolean {
  return _inRanges(codePoint, [[0xD800, 0xDBFF]]);
}

export function isLowSurrogate(codePoint: TypeAlias.codepoint): boolean {
  return _inRanges(codePoint, [[0xDC00, 0xDFFF]]);
}

// shortcut of ```isHighSurrogate(codePoint) || isLowSurrogate(codePoint)```
export function isSurrogate(codePoint: TypeAlias.codepoint): boolean {
  return _inRanges(codePoint, [[0xD800, 0xDFFF]]);
}

const _VS: [number, number] = [0xFE00, 0xFE0F];
const _VSS: [number, number] = [0xE0100, 0xE01EF];
const _MONGOLIAN_VS: [number, number] = [0x180B, 0x180F];
export function isVariationSelector(codePoint: TypeAlias.codepoint): boolean {
  return _inRanges(codePoint, [
    _VS,
    _VSS,
    _MONGOLIAN_VS,
  ]);
}
