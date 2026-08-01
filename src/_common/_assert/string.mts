import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";

export function string(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (_Type.isString(test) !== true) {
    throw _TypeError.string(targetLabel);
  }
}

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (_Type.isNonEmptyString(test) !== true) {
    throw _TypeError.nonEmptyString(targetLabel);
  }
}
