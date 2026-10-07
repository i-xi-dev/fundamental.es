import type { TypeAlias } from "../../_internal/type_alias/mod.mts";
import * as _TypeError from "../_error/type.mts";

//TODO
function _x<T>(test: Array<T>, itest: (value: T) => boolean): boolean {
  return Array.isArray(test) && test.every((i) => itest(i));
}

export function safeIntArray(
  test: Array<number>,
  targetLabel: string,
): void {
  if (_x(test, Number.isSafeInteger) !== true) {
    throw _TypeError.mustBeSafeIntArray(targetLabel);
  }
}
