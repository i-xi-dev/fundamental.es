import { _typeErrorMessage } from "../../type/_message.mts";

export function mustBeFinite(target: string): TypeError {
  const msg = _typeErrorMessage(target, "a finite number of type `number`");
  return new TypeError(msg);
}

export function mustBeSafeInt(target: string): TypeError {
  const msg = _typeErrorMessage(target, "a safe-integer of type `number`");
  return new TypeError(msg);
}

export function mustBeNonNegativeSafeInt(target: string): TypeError {
  const msg = _typeErrorMessage(
    target,
    "a non-negative safe-integer of type `number`",
  );
  return new TypeError(msg);
}
//TODO
