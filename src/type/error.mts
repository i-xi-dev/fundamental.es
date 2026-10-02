import * as TypeAlias from "../_internal/type_alias/mod.mts";

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function mustBeBigInt(target: string): TypeError {
  const msg = _message(target, "a `bigint`");
  return new TypeError(msg);
}

export function mustBeString(target: string): TypeError {
  const msg = _message(target, "a `string`");
  return new TypeError(msg);
}

export function mustBeIterable(target: string): TypeError {
  const msg = _message(target, "an `Iterable`");
  return new TypeError(msg);
}

export function mustBeAsyncIterable(target: string): TypeError {
  const msg = _message(target, "an `AsyncIterable`");
  return new TypeError(msg);
}

export function mustBeUintN(
  bits: TypeAlias.safeint,
  target: string,
): TypeError {
  const msg = _message(
    target,
    `a ${bits}-bit unsigned integer of type \`number\``,
  );
  return new TypeError(msg);
}

export function mustBeArrayBuffer(target: string): TypeError {
  const msg = _message(target, "an `ArrayBuffer`");
  return new TypeError(msg);
}

export function mustBeNonSharedUint8Array(target: string): TypeError {
  const msg = _message(
    target,
    "an `Uint8Array` that references an `ArrayBuffer`",
  );
  return new TypeError(msg);
}
