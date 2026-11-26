import { _isCodePoint } from "../_type_alias/_code_point.mts";
import { _mustBe } from "../../../_/_.mts";

export function _isNonSurrogateCodePoint(test: number): boolean {
  return _isCodePoint(test) && ((test < 0xD800) || (test > 0xDFFF));
}

function _mustBeNonSurrogateCodePoint(target: string): TypeError {
  return _mustBe(
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
