import { __inRange } from "../../../type/check.mts";
import { __mustBe } from "../../../type/error.mts";

export function _isCodePoint(test: number): boolean {
  return Number.isSafeInteger(test) && __inRange(test as number, 0, 0x10FFFF);
}

function _mustBeCodePoint(target: string): TypeError {
  return __mustBe("a Unicode code point of type `number`", target);
}

export function _assertCodePoint(test: number, targetLabel: string): void {
  if (_isCodePoint(test) !== true) {
    throw _mustBeCodePoint(targetLabel);
  }
}
