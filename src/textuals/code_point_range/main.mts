import type { _codeplane } from "../_/_type/_def/_code_plane.mts";
import type { _codepoint } from "../_/_type_alias/_def/_defs.mts";
import { _assertCodePlane } from "../_/_type/_code_plane.mts";
import { _assertCodePoint } from "../_/_type_alias/_code_point.mts";
// import { _BLOCK_RANGE } from "../code_block/_range.mts";
import {
  type ClosedRange,
  SafeIntegerClosedRange,
} from "../../numerics/mod.mts";

export type CodePointRange = ClosedRange<_codepoint>;

function _rangeOfCodePlane(
  planeNumber: _codeplane,
): [min: _codepoint, max: _codepoint] {
  const min = planeNumber * 0x10000;
  const max = min + 0xFFFF;
  return [min, max];
}

export namespace CodePointRange {
  export function fromCodePlane(planeNumber: _codeplane): CodePointRange {
    _assertCodePlane(planeNumber, "Input");
    return SafeIntegerClosedRange.of(..._rangeOfCodePlane(planeNumber)); //XXX インスタンスは1つで良いのでは
  }

  // export function fromCodeBlock(blockName: string): CodePointRange {
  //   Type.assertString(blockName, "Input");

  //   const blockRange = _BLOCK_RANGE[blockName];
  //   if (blockRange) {
  //     return SafeIntegerClosedRange.of(...blockRange); //XXX インスタンスは1つで良いのでは
  //   }
  //   throw RangeException.of("Input must be a Unicode block name");
  // }

  export function of(min: _codepoint, max: _codepoint): CodePointRange {
    _assertCodePoint(min, "Input");
    _assertCodePoint(max, "Input");
    // assert (min <= max) →SafeIntegerClosedRange.ofでチェックされる

    return SafeIntegerClosedRange.of(min, max);
  }
}
