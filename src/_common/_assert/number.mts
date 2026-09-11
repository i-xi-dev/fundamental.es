import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";
import { isNonNegative } from "../../numerics/mod.mts";

export function finite(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isFinite(test) !== true) {
    throw _TypeError.mustBeFinite(targetLabel);
  }
}

export function safeInt(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isSafeInteger(test) !== true) {
    throw _TypeError.mustBeSafeInt(targetLabel);
  }
}

export function nonNegativeSafeInt(
  test: unknown,
  targetLabel: string,
): void {
  if ((Number.isSafeInteger(test) && isNonNegative(test as number)) !== true) {
    throw _TypeError.mustBeNonNegativeSafeInt(targetLabel);
  }
}
