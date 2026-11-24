import { _isString } from "../../../_/_type/_string.mts";
import { RangeException as __RangeException } from "../../../_internal/range_error/mod.mts";

export function _isNonEmptyString(test: string): boolean {
  return _isString(test) && (test.length > 0);
}

function _mustBeNonEmptyString(target: string): RangeError {
  return __RangeException.of(
    `${target} must be a \`string\` with a length of at least 1`,
  );
}

export function _assertNonEmptyString(test: string, label: string): void {
  if (_isNonEmptyString(test) !== true) {
    throw _mustBeNonEmptyString(label);
  }
}
