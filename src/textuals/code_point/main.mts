import { _TextualException } from "../_internal/error/mod.mts";
import { Char16 } from "../char16/mod.mts";
import { Radix } from "../../numerics/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

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

export function toString(codepoint: TypeAlias.codepoint): string {
  TypeAlias.assertCodePoint(codepoint, "Input");
  return `U+${
    codepoint.toString(Radix.HEXADECIMAL).toUpperCase().padStart(
      4,
      Char16.DIGIT_ZERO,
    )
  }`;
}
