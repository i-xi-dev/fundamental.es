import type { _codeplane } from "../_/_type/_def/_code_plane.mts";
import type { _codepoint } from "../_/_type_alias/_def/_defs.mts";
import { _assertCodePoint } from "../_/_type_alias/_code_point.mts";
import { Radix as __Radix } from "../../numerics/radix.mts";
import _Char from "../_char/_const.mts";

export function _toString(codePoint: _codepoint): string {
  _assertCodePoint(codePoint, "Input");
  const hex = codePoint.toString(__Radix.HEXADECIMAL);
  return `U+${hex.toUpperCase().padStart(4, _Char.DIGIT_ZERO)}`;
}

export function _codePlaneOf(codePoint: _codepoint): _codeplane {
  _assertCodePoint(codePoint, "Input");
  return Math.trunc(codePoint / 0x10000) as _codeplane;
}

// export function _codeBlockOf(codePoint: _codepoint): string {
//   _assertCodePoint(codePoint, "Input");
//   for (const [blockName, range] of Object.entries(_BLOCK_RANGE)) {
//     if ((codePoint >= range[0]) && (codePoint <= range[1])) {
//       return blockName;
//     }
//   }
//   return "No_Block";
// }

//TODO _fromBytes

//TODO export function _toBytes(codePoint: _codepoint): TypeAlias.Bytes {
//   _assertCodePoint(codePoint, "Input");

//   if (codePoint < 0x80) {
//     return Uint8Array.of(codePoint);
//   } else if (codePoint < 0x800) {
//   } else if (codePoint < 0x10000) {
//   } else {
//   }
// }
