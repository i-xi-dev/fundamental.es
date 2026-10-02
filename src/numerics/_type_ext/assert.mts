import { _isNonNegativeSafeInt } from "../_base.mts";
import * as Exception from "./error.mts";

export function finite(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isFinite(test) !== true) {
    throw Exception.mustBeFinite(targetLabel);
  }
}

export function safeInt(
  test: unknown,
  targetLabel: string,
): void {
  if (Number.isSafeInteger(test) !== true) {
    throw Exception.mustBeSafeInt(targetLabel);
  }
}

export function nonNegativeSafeInt(
  test: unknown,
  targetLabel: string,
): void {
  if ((_isNonNegativeSafeInt(test)) !== true) {
    throw Exception.mustBeNonNegativeSafeInt(targetLabel);
  }
}
