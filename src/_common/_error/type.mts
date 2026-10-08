//TODO 移動

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function mustBe(typeDesc: string, target: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function mustBeSafeIntArray(target: string): TypeError {
  const msg = _message(target, "an `Array` of safe-integers of type `number`");
  return new TypeError(msg);
}

export function mustBeFinite(target: string): TypeError {
  const msg = _message(target, "a finite number of type `number`");
  return new TypeError(msg);
}

export function mustBeSafeInteger(target: string): TypeError {
  const msg = _message(target, "a safe-integer of type `number`");
  return new TypeError(msg);
}

export function mustBeCodePoint(target: string): TypeError {
  const msg = _message(
    target,
    "a Unicode code point of type `number`",
  );
  return new TypeError(msg);
}
