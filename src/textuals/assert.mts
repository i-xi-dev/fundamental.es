import { _Error } from "../_common/mod.mts";
import { _isNonEmptyString } from "./_base.mts";
import { CodePoint } from "./code_point.mts";

export namespace Assert {
  export function codePoint(test: unknown, targetLabel: string): void {
    if (CodePoint.isCodePoint(test) !== true) {
      throw new Error("TODO");
    }
  }

  export function nonEmptyString(
    test: unknown,
    targetLabel: string,
  ): void {
    if (_isNonEmptyString(test) !== true) {
      throw _Error.Type.mustBeNonEmptyString(targetLabel);
    }
  }
}
