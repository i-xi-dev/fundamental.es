import { _typeErrorMessage } from "../../../type/_message.mts";

export function mustBeFinite(target: string): TypeError {
  const msg = _typeErrorMessage(target, "a finite number of type `number`");
  return new TypeError(msg);
}

export function mustBeSafeInteger(target: string): TypeError {
  const msg = _typeErrorMessage(target, "a safe-integer of type `number`");
  return new TypeError(msg);
}

export function mustBeNonNegativeSafeInteger(target: string): TypeError {
  const msg = _typeErrorMessage(
    target,
    "a non-negative safe-integer of type `number`",
  );
  return new TypeError(msg);
}
