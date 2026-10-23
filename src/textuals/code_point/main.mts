import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { _assertCodePoint, _isCodePoint } from "../_internal/common.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { Char16 } from "../char16/mod.mts";
import { Radix } from "../../numerics/mod.mts";
import { Type } from "../../type/mod.mts";

/** U+0020 `" "` */
export const SPACE = 0x20;

/** U+0025 `"%"` */
export const PERCENT_SIGN = 0x25;

/** U+002B `"+"` */
export const PLUS_SIGN = 0x2B;

/** U+0030 `"0"` */
export const DIGIT_ZERO = 0x30;

/** U+007E `"~"` */
export const TILDE = 0x7E;

export { _isCodePoint as is };

export { _assertCodePoint as assert };

export function toString(codePoint: TypeAlias.codepoint): string {
  _assertCodePoint(codePoint, "Input");
  return `U+${
    codePoint.toString(Radix.HEXADECIMAL).toUpperCase().padStart(
      4,
      Char16.DIGIT_ZERO,
    )
  }`;
}

export function planeOf(codePoint: TypeAlias.codepoint): Type.plane {
  _assertCodePoint(codePoint, "Input");
  return Math.trunc(codePoint / 0x10000) as Type.plane;
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
  return ranges.some((range) => codePoint >= range[0] && codePoint <= range[1]);
}

// shortcut of ```CodePointRange.fromPlane(Plane.BMP).contains(codePoint)```
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
