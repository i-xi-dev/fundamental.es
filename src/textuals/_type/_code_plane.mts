import { __inRange } from "../../type/check.mts";
import { __mustBe } from "../../type/error.mts";
import { _codeplane } from "./_def/_code_plane.mts";

export function _isCodePlane(test: unknown): test is _codeplane {
  return Number.isSafeInteger(test) && __inRange(test as number, 0, 16);
}

function _mustBeCodePlane(target: string): TypeError {
  return __mustBe(`a Unicode plane of type \`number\``, target);
}

export function _assertCodePlane(
  test: unknown,
  label: string,
): asserts test is _codeplane {
  if (_isCodePlane(test) !== true) {
    throw _mustBeCodePlane(label);
  }
}
