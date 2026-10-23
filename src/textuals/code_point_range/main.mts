import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import {
  type ClosedRange,
  SafeIntegerClosedRange,
} from "../../numerics/mod.mts";
import { Type } from "../../mod.mts";

export type CodePointRange = ClosedRange<TypeAlias.codepoint>;

function _rangeOfPlane(
  plane: Type.plane,
): [min: TypeAlias.codepoint, max: TypeAlias.codepoint] {
  const min = plane * 0x10000;
  const max = min + 0xFFFF;
  return [min, max];
}

export namespace CodePointRange {
  export function fromPlane(plane: Type.plane): CodePointRange {
    Type.assertPlane(plane, "Input");
    return SafeIntegerClosedRange.of(..._rangeOfPlane(plane)); //XXX インスタンスは1つで良いのでは
  }

  //TODO fromBlock()
  //TODO of()
}

// export namespace Block {
//   export function HIGH_SURROGATES(): CodePointRange {
//     return SafeIntegerClosedRange.of(0xD800, 0xDB7F);
//   }
//
//   export function HIGH_PRIVATE_USE_SURROGATES(): CodePointRange {
//     return SafeIntegerClosedRange.of(0xDB80, 0xDBFF);
//   }
//
//   export function LOW_SURROGATES(): CodePointRange {
//     return SafeIntegerClosedRange.of(0xDC00, 0xDFFF);
//   }
// }
