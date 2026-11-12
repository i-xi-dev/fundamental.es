import { RangeException as __RangeException } from "../../_internal/range_error/mod.mts";
import { __isString } from "../../type/check.mts";

export function _isNonEmptyString(test: string): boolean {
  return __isString(test) && (test.length > 0);
}

function _mustBeNonEmptyString(target: string): RangeError {
  return __RangeException.of(
    `${target} must be a \`string\` with a length of at least 1`,
  );
}

export function _assertNonEmptyString(
  test: string,
  targetLabel: string,
): void {
  if (_isNonEmptyString(test) !== true) {
    throw _mustBeNonEmptyString(targetLabel);
  }
}
