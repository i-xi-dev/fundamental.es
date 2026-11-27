import { _isNullOrUndefined } from "../_.mts";

export function _isNonNullObject(test: unknown): test is NonNullable<object> {
  return (typeof test === "object") && (_isNullOrUndefined(test) !== true);
}
