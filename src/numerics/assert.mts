import { _Error, _Type } from "../_common/mod.mts";
import { _isNonNegative } from "./_base.mts";

export namespace Assert {
  export function finite(
    test: unknown,
    targetLabel: string,
  ): void {
    if (Number.isFinite(test) !== true) {
      throw _Error.Type.mustBeFinite(targetLabel);
    }
  }

  export function safeInt(
    test: unknown,
    targetLabel: string,
  ): void {
    if (Number.isSafeInteger(test) !== true) {
      throw _Error.Type.mustBeSafeInt(targetLabel);
    }
  }

  export function nonNegativeSafeInt(
    test: unknown,
    targetLabel: string,
  ): void {
    if (
      (Number.isSafeInteger(test) && _isNonNegative(test as number)) !== true
    ) {
      throw _Error.Type.mustBeNonNegativeSafeInt(targetLabel);
    }
  }
}
