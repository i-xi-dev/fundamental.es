import * as _Type from "../_type/mod.mts";
import { _TypeError } from "../../_internal/mod.mts";
import { isNonNegative } from "../../numerics/mod.mts";

export function finite(
  test: unknown,
  targetLabel: string,
): asserts test is _Type.finite {
  if (_Type.isFinite(test) !== true) {
    throw _TypeError.finite(targetLabel);
  }
}

export function safeInt(
  test: unknown,
  targetLabel: string,
): asserts test is _Type.safeint {
  if (_Type.isSafeInt(test) !== true) {
    throw _TypeError.safeInt(targetLabel);
  }
}

export function nonNegativeSafeInt(
  test: unknown,
  targetLabel: string,
): asserts test is _Type.safeint {
  if ((_Type.isSafeInt(test) && isNonNegative(test)) !== true) {
    throw _TypeError.nonNegativeSafeInt(targetLabel);
  }
}
