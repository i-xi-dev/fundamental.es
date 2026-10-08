import { _typeErrorMessage } from "../../../type/_message.mts";

export function mustBeNonNegativeSafeInteger(target: string): TypeError {
  const msg = _typeErrorMessage(
    target,
    "a non-negative safe-integer of type `number`",
  );
  return new TypeError(msg);
}
