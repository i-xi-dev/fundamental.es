import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): void {
  if (_Type.isNonEmptyString(test) !== true) {
    throw _TypeError.mustBeNonEmptyString(targetLabel);
  }
}
