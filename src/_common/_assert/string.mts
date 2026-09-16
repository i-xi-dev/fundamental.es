import * as _TypeError from "../_error/type.mts";
import { isNonEmpty } from "../../textual/mod.mts";

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): void {
  if (isNonEmpty(test) !== true) {
    throw _TypeError.mustBeNonEmptyString(targetLabel);
  }
}
