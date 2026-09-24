import * as _TypeError from "../_error/type.mts";
import { Text } from "../../textual/mod.mts";

export function nonEmptyString(
  test: unknown,
  targetLabel: string,
): void {
  if (Text.isNonEmpty(test) !== true) {
    throw _TypeError.mustBeNonEmptyString(targetLabel);
  }
}
