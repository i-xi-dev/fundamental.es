import { CodePoint } from "./code_point/mod.mts";
import { CodePointRange } from "./code_point_range/mod.mts";
import { Type } from "../type/mod.mts";
import { TypeAlias } from "../_internal/type_alias/mod.mts";

export type RuneInfo = {
  codePoint: TypeAlias.codepoint;
  char32: TypeAlias.char32;
  char16s: [TypeAlias.char16, TypeAlias.char16] | [TypeAlias.char16];
};

type _FromOptions = {
  allowLoneSurrogate?: boolean;
};

export namespace RuneInfo {
  export type FromOptions = _FromOptions;

  export function fromCodePoint(
    codePoint: TypeAlias.codepoint,
    options?: _FromOptions,
  ): RuneInfo {
    TypeAlias.assertCodePoint(codePoint, "Input");

    if (options?.allowLoneSurrogate !== true) {
      if (CodePointRange.SURROGATES.contains(codePoint) === true) {
        throw new Error("TODO");
      }
    }

    const char32 = String.fromCodePoint(codePoint);
    return {
      codePoint,
      char32,
      char16s: (char32.length === 1)
        ? [char32]
        : [char32.charAt(0), char32.charAt(1)],
    };
  }

  // export function fromChar32(): RuneInfo {
  // }
}

//TODO

// export function inBmp(rune: TypeAlias.char32): boolean {
//   return Type.isString(rune) && (rune.length === 1);
// }

// const _HIGH_SURROGATE = /^[\uD800-\uDBFF]$/;

// export function isHighSurrogate(rune: TypeAlias.char32): boolean {
//   //TODO isString &&
//   return _HIGH_SURROGATE.test(rune);
// }
