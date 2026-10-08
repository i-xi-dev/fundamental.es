import { _typeErrorMessage } from "../../../type/_message.mts";

export function mustBeNonEmptyString(target: string): TypeError {
  const msg = _typeErrorMessage(
    target,
    "a `string` with a length of at least 1.",
  );
  return new TypeError(msg);
}
