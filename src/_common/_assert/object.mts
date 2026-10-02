import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";
import * as TypeAlias from "../../type_alias/mod.mts";

export function safeIntArray(
  test: unknown,
  targetLabel: string,
): asserts test is Array<TypeAlias.safeint> {
  if (_Type.isSafeIntArray(test) !== true) {
    throw _TypeError.mustBeSafeIntArray(targetLabel);
  }
}
