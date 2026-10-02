import { Range } from "../numerics/mod.mts";
import { TypeAlias } from "../type/mod.mts";

export type CodePointRange = Range.ClosedRange<TypeAlias.codepoint>;

let _surrogate: WeakRef<CodePointRange> | undefined;

let _highSurrogate: WeakRef<CodePointRange> | undefined;

export const CodePointRange = {
  // export function ALL(): CodePointRange {
  // }

  get SURROGATES(): CodePointRange {
    if (!_surrogate?.deref()) {
      _surrogate = new WeakRef(Range.safeIntClosedRange(0xD800, 0xDFFF));
    }
    return _surrogate.deref()!;
  },

  get HIGH_SURROGATES(): CodePointRange {
    if (!_highSurrogate?.deref()) {
      _highSurrogate = new WeakRef(Range.safeIntClosedRange(0xD800, 0xDBFF));
    }
    return _highSurrogate.deref()!;
  },
};

// export namespace Block {
//   export function HIGH_SURROGATES(): CodePointRange {
//     return Range.safeIntClosedRange(0xD800, 0xDB7F);
//   }
//
//   export function HIGH_PRIVATE_USE_SURROGATES(): CodePointRange {
//     return Range.safeIntClosedRange(0xDB80, 0xDBFF);
//   }
//
//   export function LOW_SURROGATES(): CodePointRange {
//     return Range.safeIntClosedRange(0xDC00, 0xDFFF);
//   }
// }
