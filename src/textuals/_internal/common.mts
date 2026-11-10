import type { _char8 } from "../_type/_def/_char8.mts";
import { _isCodePoint } from "../_type_alias/_code_point.mts";
import { _isSafeInt } from "../../numerics/_internal/common.mts";
import { _TextualException } from "./error/mod.mts";
import { Type } from "../../type/mod.mts";

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

export function _isNonSurrogateCodePoint(test: number): boolean {
  return _isCodePoint(test) && ((test < 0xD800) || (test > 0xDFFF));
}

export function _assertNonSurrogateCodePoint(
  test: number,
  targetLabel: string,
): void {
  if (_isNonSurrogateCodePoint(test) !== true) {
    throw _TextualException.mustBeNonSurrogateCodePoint(targetLabel);
  }
}

export function _byteToChar8(byte: Type.uint8): _char8 {
  return String.fromCharCode(byte) as _char8;
}

export function _char8ToByte(char: _char8): Type.uint8 {
  return char.charCodeAt(0) as Type.uint8;
}
