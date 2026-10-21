import { _isSafeInt } from "../../numerics/_internal/common.mts";
import { _TextualException } from "./error/mod.mts";
import { Type } from "../../type/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export function _isNonEmptyString(test: unknown): boolean {
  return Type.isString(test) && (test.length > 0);
}

const _MIN_CODE_POINT = 0;
const _MAX_CODE_POINT = 0x10FFFF;

export function _isCodePoint(test: number): boolean {
  return _isSafeInt(test) &&
    ((test as TypeAlias.safeint) >= _MIN_CODE_POINT) &&
    ((test as TypeAlias.safeint) <= _MAX_CODE_POINT);
}

export function _assertCodePoint(test: number, targetLabel: string): void {
  if (_isCodePoint(test) !== true) {
    throw _TextualException.mustBeCodePoint(targetLabel);
  }
}

export function _isChar16(test: string): boolean {
  return Type.isString(test) && (test.length === 1);
}

export function _isChar32(test: string): boolean {
  if (Type.isString(test) === true) {
    if (test.length === 1) {
      return true;
    } else if (test.length === 2) {
      // return test.isWellFormed() && ([...test].length === 1);
      return [...test].length === 1; // lone surrogate を許容
    }
  }
  return false;
}
