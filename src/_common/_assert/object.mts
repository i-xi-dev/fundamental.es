import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";

export function safeIntArray(
  test: unknown,
  targetLabel: string,
): asserts test is Array<TypeAlias.safeint> {
  if (_Type.isSafeIntArray(test) !== true) {
    throw _TypeError.mustBeSafeIntArray(targetLabel);
  }
}
