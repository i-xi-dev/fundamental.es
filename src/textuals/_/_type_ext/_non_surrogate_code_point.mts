import { __mustBe } from "../../../type/error.mts";
import { _isCodePoint } from "../_type_alias/_code_point.mts";

export function _isNonSurrogateCodePoint(test: number): boolean {
  return _isCodePoint(test) && ((test < 0xD800) || (test > 0xDFFF));
}

function _mustBeNonSurrogateCodePoint(target: string): TypeError {
  return __mustBe(
    "a non-surrogate Unicode code point of type `number`",
    target,
  );
}

export function _assertNonSurrogateCodePoint(
  test: number,
  label: string,
): void {
  if (_isNonSurrogateCodePoint(test) !== true) {
    throw _mustBeNonSurrogateCodePoint(label);
  }
}
