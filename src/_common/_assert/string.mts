import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";
import { Type } from "../../type/mod.mts";

export function string(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (Type.isString(test) !== true) {
    throw _TypeError.mustBeString(targetLabel);
  }
}

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): void {
  if (_Type.isNonEmptyString(test) !== true) {
    throw _TypeError.mustBeNonEmptyString(targetLabel);
  }
}
