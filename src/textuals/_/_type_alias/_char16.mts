import { __isString } from "../../../type/check.mts";
import { __mustBe } from "../../../type/error.mts";

export function _isChar16(test: string): boolean {
  return __isString(test) && (test.length === 1);
}

function _mustBeChar16(target: string): TypeError {
  return __mustBe(
    "a single character with a code point of `0xFFFF` or lower",
    target,
  );
}

export function _assertChar16(test: string, label: string): void {
  if (_isChar16(test) !== true) {
    throw _mustBeChar16(label);
  }
}
