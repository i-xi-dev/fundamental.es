import { Type } from "../type/mod.mts";

/** U+0020 `" "` */
export const SPACE = " ";

/** U+0025 `"%"` */
export const PERCENT_SIGN = "%";

/** U+002B `"+"` */
export const PLUS_SIGN = "+";

/** U+0030 `"0"` */
export const DIGIT_ZERO = "0";

/** U+007E `"~"` */
export const TILDE = "~";

export function isChar16(test: unknown): boolean {
  return Type.isString(test) && (test.length === 1);
}
