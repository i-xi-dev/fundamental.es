import { __isString } from "../../type/check.mts";
import { __mustBe } from "../../type/error.mts";
import { _char7 } from "./_def/_char7.mts";

// deno-lint-ignore no-control-regex
const _char7Regex = /^[\u0000-\u007F]$/;
export function _isChar7(test: unknown): test is _char7 {
  return __isString(test) && _char7Regex.test(test);
}

function _mustBeChar7(target: string): TypeError {
  return __mustBe(
    "a single character with a code point of `0x7F` or lower",
    target,
  );
}

export function _assertChar7(
  test: unknown,
  label: string,
): asserts test is _char7 {
  if (_isChar7(test) !== true) {
    throw _mustBeChar7(label);
  }
}
