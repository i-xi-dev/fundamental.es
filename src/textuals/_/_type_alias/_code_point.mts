import { _inNumericRange } from "../../../_/_.mts";
import { __mustBe } from "../../../type/error.mts";

export function _isCodePoint(test: number): boolean {
  return Number.isSafeInteger(test) &&
    _inNumericRange(test as number, 0, 0x10FFFF);
}

function _mustBeCodePoint(target: string): TypeError {
  return __mustBe("a Unicode code point of type `number`", target);
}

export function _assertCodePoint(test: number, label: string): void {
  if (_isCodePoint(test) !== true) {
    throw _mustBeCodePoint(label);
  }
}
