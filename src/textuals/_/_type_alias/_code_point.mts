import { _inNumericRange, _mustBe } from "../../../_/_.mts";

export function _isCodePoint(test: number): boolean {
  return Number.isSafeInteger(test) &&
    _inNumericRange(test as number, 0, 0x10FFFF);
}

function _mustBeCodePoint(target: string): TypeError {
  return _mustBe("a Unicode code point of type `number`", target);
}

export function _assertCodePoint(test: number, label: string): void {
  if (_isCodePoint(test) !== true) {
    throw _mustBeCodePoint(label);
  }
}
