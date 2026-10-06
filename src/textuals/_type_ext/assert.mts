import * as TextualTypeException from "./error.mts";
import { _isNonEmptyString } from "../_base.mts";
import { CodePoint } from "../code_point.mts";

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): void {
  if (_isNonEmptyString(test) !== true) {
    throw TextualTypeException.mustBeNonEmptyString(targetLabel);
  }
}

export function codePoint(test: unknown, targetLabel: string): void {
  if (CodePoint.isCodePoint(test) !== true) {
    throw TextualTypeException.mustBeCodePoint(targetLabel);
  }
}
//TODO is～と同じ場所に移す
