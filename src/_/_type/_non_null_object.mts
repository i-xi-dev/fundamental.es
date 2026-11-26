import { __isNullOrUndefined } from "../../type/check.mts";

export function _isNonNullObject(test: unknown): test is NonNullable<object> {
  return (typeof test === "object") && (__isNullOrUndefined(test) !== true);
}
