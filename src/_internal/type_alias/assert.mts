import * as Exception from "./error.mts";
import { isSafeIntegerArray } from "./check.mts";

export function assertSafeIntegerArray(
  test: unknown,
  targetLabel: string,
): void {
  if (isSafeIntegerArray(test) !== true) {
    throw Exception.mustBeSafeIntegerArray(targetLabel);
  }
}
