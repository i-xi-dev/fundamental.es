import { _assertChar16, _isChar16 } from "../_internal/common.mts";

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

export { _isChar16 as is };

export { _assertChar16 as assert };
