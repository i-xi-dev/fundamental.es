import { _T } from "../../_common/mod.mts";
import { _TypeError } from "../mod.mts";
import { isNonNegative } from "../../numerics/mod.mts";

export function nonNegativeSafeInt(
  test: unknown,
  targetLabel: string,
): asserts test is _T.safeint {
  if ((_T.isSafeInt(test) && isNonNegative(test)) !== true) {
    throw _TypeError.nonNegativeSafeInt(targetLabel);
  }
}
