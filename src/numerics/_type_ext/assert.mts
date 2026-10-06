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

//TODO is～と同じ場所に移す
