import { __isString } from "../../../type/check.mts";
import { __mustBe } from "../../../type/error.mts";
import { _char8 } from "./_def/_char8.mts";

// deno-lint-ignore no-control-regex
const _char8Regex = /^[\u0000-\u00FF]$/;
export function _isChar8(test: unknown): test is _char8 {
  return __isString(test) && _char8Regex.test(test);
}

function _mustBeChar8(target: string): TypeError {
  return __mustBe(
    "a single character with a code point of `0xFF` or lower",
    target,
  );
}

export function _assertChar8(
  test: unknown,
  label: string,
): asserts test is _char8 {
  if (_isChar8(test) !== true) {
    throw _mustBeChar8(label);
  }
}
