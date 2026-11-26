import { _isString } from "../../../_/_type/_string.mts";
import { _mustBe } from "../../../_/_.mts";

export function _isChar16(test: string): boolean {
  return _isString(test) && (test.length === 1);
}

function _mustBeChar16(target: string): TypeError {
  return _mustBe(
    "a single character with a code point of `0xFFFF` or lower",
    target,
  );
}

export function _assertChar16(test: string, label: string): void {
  if (_isChar16(test) !== true) {
    throw _mustBeChar16(label);
  }
}
