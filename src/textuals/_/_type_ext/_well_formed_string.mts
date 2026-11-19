import { RangeException as __RangeException } from "../../../_internal/range_error/mod.mts";
import { __isString } from "../../../type/check.mts";

export function _isWellFormedString(test: string): boolean {
  return __isString(test) && test.isWellFormed();
}

function _mustBeWellFormedString(target: string): RangeError {
  return __RangeException.of(`${target} must be a well-formed \`string\``);
}

export function _assertWellFormedString(test: string, label: string): void {
  if (_isWellFormedString(test) !== true) {
    throw _mustBeWellFormedString(label);
  }
}
