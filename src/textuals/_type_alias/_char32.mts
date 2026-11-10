import { __isString } from "../../type/check.mts";
import { __mustBe } from "../../type/error.mts";

// lone surrogate を許容しない
export function _isChar32(test: string): boolean {
  if (__isString(test) === true) {
    if (test.length === 1) {
      return test.isWellFormed();
    } else if (test.length === 2) {
      return test.isWellFormed() && ([...test].length === 1);
    }
  }
  return false;
}

function _mustBeChar32(target: string): TypeError {
  return __mustBe("a well-formed single character", target);
}

export function _assertChar32(test: string, label: string): void {
  if (_isChar32(test) !== true) {
    throw _mustBeChar32(label);
  }
}
