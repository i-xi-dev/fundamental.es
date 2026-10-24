import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import { _assertCodePoint } from "../_internal/common.mts";
// import { _BLOCK_RANGE } from "../code_block/_range.mts";
import {
  type ClosedRange,
  SafeIntegerClosedRange,
} from "../../numerics/mod.mts";
import { Type } from "../../mod.mts";

export type CodePointRange = ClosedRange<TypeAlias.codepoint>;

function _rangeOfCodePlane(
  planeNumber: Type.codeplane,
): [min: TypeAlias.codepoint, max: TypeAlias.codepoint] {
  const min = planeNumber * 0x10000;
  const max = min + 0xFFFF;
  return [min, max];
}

export namespace CodePointRange {
  export function fromCodePlane(planeNumber: Type.codeplane): CodePointRange {
    Type.assertCodePlane(planeNumber, "Input");
    return SafeIntegerClosedRange.of(..._rangeOfCodePlane(planeNumber)); //XXX インスタンスは1つで良いのでは
  }

  // export function fromCodeBlock(blockName: string): CodePointRange {
  //   Type.assertString(blockName, "Input");

  //   const blockRange = _BLOCK_RANGE[blockName];
  //   if (blockRange) {
  //     return SafeIntegerClosedRange.of(...blockRange); //XXX インスタンスは1つで良いのでは
  //   }
  //   throw new RangeError("Input must be a Unicode block name");
  // }

  export function of(
    min: TypeAlias.codepoint,
    max: TypeAlias.codepoint,
  ): CodePointRange {
    _assertCodePoint(min, "Input");
    _assertCodePoint(max, "Input");
    // assert (min <= max) →SafeIntegerClosedRange.ofでチェックされる

    return SafeIntegerClosedRange.of(min, max);
  }
}
