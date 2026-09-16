import { Range } from "../numerics/mod.mts";
import { TypeAlias } from "../type/mod.mts";

type _Range = Range.ClosedRange<TypeAlias.codepoint>;

export namespace CodePointRange {
  // export function ALL(): _Range {
  //   return Range.safeIntClosedRange(0x0000, 0x10FFFF);
  // }

  export function SURROGATE(): _Range {
    return Range.safeIntClosedRange(0xD800, 0xDFFF); //TODO （変更不可なのだから）呼ばれるたびに生成しないようにする
  }

  export function HIGH_SURROGATE(): _Range {
    return Range.safeIntClosedRange(0xD800, 0xDBFF);
  }
}

// export namespace Block {
//   export function HIGH_SURROGATES(): _Range {
//     return Range.safeIntClosedRange(0xD800, 0xDB7F);
//   }
//
//   export function HIGH_PRIVATE_USE_SURROGATES(): _Range {
//     return Range.safeIntClosedRange(0xDB80, 0xDBFF);
//   }
//
//   export function LOW_SURROGATES(): _Range {
//     return Range.safeIntClosedRange(0xDC00, 0xDFFF);
//   }
// }
