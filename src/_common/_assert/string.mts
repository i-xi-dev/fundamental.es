import { _TypeError } from "../../_internal/mod.mts";
import { _T } from "../mod.mts";

export function string(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (_T.isString(test) !== true) {
    throw _TypeError.string(targetLabel);
  }
}

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (_T.isNonEmptyString(test) !== true) {
    throw _TypeError.nonEmptyString(targetLabel);
  }
}
