import { safeint } from "../_type/mod.mts";

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function mustBe(typeDesc: string, target: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function mustBeArrayBuffer(target: string): TypeError {
  const msg = _message(target, "an `ArrayBuffer`");
  return new TypeError(msg);
}

export function mustBeAsyncIterable(target: string): TypeError {
  const msg = _message(target, "an `AsyncIterable`");
  return new TypeError(msg);
}

export function mustBeBigInt(target: string): TypeError {
  const msg = _message(target, "a `bigint`");
  return new TypeError(msg);
}

export function mustBeBigUintN(bits: safeint, target: string): TypeError {
  const msg = _message(
    target,
    `a ${bits}-bit unsigned integer of type \`bigint\``,
  );
  return new TypeError(msg);
}

export function mustBeBytes(target: string): TypeError {
  const msg = _message(
    target,
    "an `Uint8Array` that references an `ArrayBuffer`",
  );
  return new TypeError(msg);
}

export function mustBeFinite(target: string): TypeError {
  const msg = _message(target, "a finite number of type `number`");
  return new TypeError(msg);
}

export function mustBeIterable(target: string): TypeError {
  const msg = _message(target, "an `Iterable`");
  return new TypeError(msg);
}

export function mustBeNonEmptyString(target: string): TypeError {
  const msg = _message(target, "a `string` with a length of at least 1.");
  return new TypeError(msg);
}

export function mustBeNonNegativeSafeInt(target: string): TypeError {
  const msg = _message(target, "a non-negative safe-integer of type `number`");
  return new TypeError(msg);
}

export function mustBeSafeInt(target: string): TypeError {
  const msg = _message(target, "a safe-integer of type `number`");
  return new TypeError(msg);
}

export function mustBeSafeIntArray(target: string): TypeError {
  const msg = _message(target, "an `Array` of safe-integers of type `number`");
  return new TypeError(msg);
}

export function mustBeString(target: string): TypeError {
  const msg = _message(target, "a `string`");
  return new TypeError(msg);
}

export function mustBeUintN(bits: safeint, target: string): TypeError {
  const msg = _message(
    target,
    `a ${bits}-bit unsigned integer of type \`number\``,
  );
  return new TypeError(msg);
}
