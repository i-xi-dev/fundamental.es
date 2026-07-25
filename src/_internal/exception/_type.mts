import { _T } from "../../_common/mod.mts";

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function arrayBuffer(target: string): TypeError {
  const msg = _message(target, "an `ArrayBuffer`");
  return new TypeError(msg);
}

export function asyncIterable(target: string): TypeError {
  const msg = _message(target, "an `AsyncIterable`");
  return new TypeError(msg);
}

export function bigInt(target: string): TypeError {
  const msg = _message(target, "a `bigint`");
  return new TypeError(msg);
}

export function bigUintN(bits: _T.safeint, target: string): TypeError {
  const msg = _message(
    target,
    `a ${bits}-bit unsigned integer of type \`bigint\``,
  );
  return new TypeError(msg);
}

export function bytes(target: string): TypeError {
  const msg = _message(
    target,
    "an `Uint8Array` that references an `ArrayBuffer`",
  );
  return new TypeError(msg);
}

export function custom(target: string, typeDesc: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function finite(target: string): TypeError {
  const msg = _message(target, "a finite number of type `number`");
  return new TypeError(msg);
}

export function iterable(target: string): TypeError {
  const msg = _message(target, "an `Iterable`");
  return new TypeError(msg);
}

export function nonEmptyString(target: string): TypeError {
  const msg = _message(target, "a `string` with a length of at least 1.");
  return new TypeError(msg);
}

export function nonNegativeSafeInt(target: string): TypeError {
  const msg = _message(target, "a non-negative safe-integer of type `number`");
  return new TypeError(msg);
}

export function safeInt(target: string): TypeError {
  const msg = _message(target, "a safe-integer of type `number`");
  return new TypeError(msg);
}

export function string(target: string): TypeError {
  const msg = _message(target, "a `string`");
  return new TypeError(msg);
}

export function uintN(bits: _T.safeint, target: string): TypeError {
  const msg = _message(
    target,
    `a ${bits}-bit unsigned integer of type \`number\``,
  );
  return new TypeError(msg);
}
