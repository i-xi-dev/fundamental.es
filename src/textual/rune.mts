import { Assert } from "./assert.mts";
import { CodePointRange } from "./code_point_range.mts";
import { Type, TypeAlias } from "../type/mod.mts";

// type _FromOptions = {
//   allowLoneSurrogate?: boolean;
// };

// export class RuneInfo {
//   readonly #codePoint: TypeAlias.codepoint;

//   private constructor(codePoint: TypeAlias.codepoint) {
//     this.#codePoint = codePoint;
//   }

//   get codePoint(): TypeAlias.codepoint {
//     return this.#codePoint;
//   }

//   static fromCodePoint(
//     codePoint: TypeAlias.codepoint,
//     options?: _FromOptions,
//   ): Rune {
//     Assert.codePoint(codePoint, "Input");

//     if (options?.allowLoneSurrogate !== true) {
//       if (CodePointRange.SURROGATES.contains(codePoint) === true) {
//         throw new Error("TODO");
//       }
//     }

//     return new Rune(codePoint);
//   }

//   toString(): TypeAlias.char32 {
//     return String.fromCodePoint(this.#codePoint);
//   }

//   // toCodePoint(): TypeAlias.codepoint {
//   //   return this.#codePoint;
//   // }
// }

// export namespace Rune {
//   export type FromOptions = _FromOptions;

// }

//TODO

// export function inBmp(rune: TypeAlias.char32): boolean {
//   return Type.isString(rune) && (rune.length === 1);
// }

// const _HIGH_SURROGATE = /^[\uD800-\uDBFF]$/;

// export function isHighSurrogate(rune: TypeAlias.char32): boolean {
//   //TODO isString &&
//   return _HIGH_SURROGATE.test(rune);
// }
