import { _T } from "../mod.mts";
import { _TypeError } from "../../_internal/mod.mts";
import { isNonNegative } from "../../numerics/mod.mts";

export function finite(
  test: unknown,
  targetLabel: string,
): asserts test is _T.finite {
  if (_T.isFinite(test) !== true) {
    throw _TypeError.finite(targetLabel);
  }
}

export function safeInt(
  test: unknown,
  targetLabel: string,
): asserts test is _T.safeint {
  if (_T.isSafeInt(test) !== true) {
    throw _TypeError.safeInt(targetLabel);
  }
}

export function nonNegativeSafeInt(
  test: unknown,
  targetLabel: string,
): asserts test is _T.safeint {
  if ((_T.isSafeInt(test) && isNonNegative(test)) !== true) {
    throw _TypeError.nonNegativeSafeInt(targetLabel);
  }
}
