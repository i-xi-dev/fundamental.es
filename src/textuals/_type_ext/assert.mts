import * as TextualTypeException from "./error.mts";
import { _isNonEmptyString } from "../_base.mts";

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): void {
  if (_isNonEmptyString(test) !== true) {
    throw TextualTypeException.mustBeNonEmptyString(targetLabel);
  }
}
