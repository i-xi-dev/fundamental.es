import { _isSafeInt } from "../../numerics/_internal/common.mts";
import { _TextualException } from "./error/mod.mts";
import { Type } from "../../type/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export function _isNonEmptyString(test: string): boolean {
  return Type.isString(test) && (test.length > 0);
}

export function _assertNonEmptyString(
  test: string,
  targetLabel: string,
): void {
  if (_isNonEmptyString(test) !== true) {
    throw _TextualException.mustBeNonEmptyString(targetLabel);
  }
}

export function _isWellFormedString(test: string): boolean {
  return Type.isString(test) && test.isWellFormed();
}

export function _assertWellFormedString(
  test: string,
  targetLabel: string,
): void {
  if (_isWellFormedString(test) !== true) {
    throw _TextualException.mustBeWellFormedString(targetLabel);
  }
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

export function _assertChar16(test: string, targetLabel: string): void {
  if (_isChar16(test) !== true) {
    throw _TextualException.mustBeChar16(targetLabel);
  }
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

export function _assertChar32(test: string, targetLabel: string): void {
  if (_isChar32(test) !== true) {
    throw _TextualException.mustBeChar32(targetLabel);
  }
}
