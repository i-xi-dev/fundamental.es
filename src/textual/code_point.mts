import * as Char16 from "./char16.mts";
import { Radix } from "../numerics/mod.mts";
import { TypeAlias } from "../type/mod.mts";

const _MIN = 0;
const _MAX = 0x10FFFF;

export namespace CodePoint {
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

  export function isCodePoint(test: unknown): boolean {
    return Number.isSafeInteger(test) &&
      ((test as TypeAlias.safeint) >= _MIN) &&
      ((test as TypeAlias.safeint) <= _MAX);
  }

  export function toString(codepoint: TypeAlias.codepoint): string {
    if (isCodePoint(codepoint) !== true) {
      throw new Error("TODO");
    }
    return `U+${
      codepoint.toString(Radix.HEXADECIMAL).toUpperCase().padStart(
        4,
        Char16.DIGIT_ZERO,
      )
    }`;
  }
}
