import type { TypeAlias } from "../_internal/type_alias/mod.mts";
import { _typeErrorMessage } from "./_message.mts";

export function mustBeBigInt(target: string): TypeError {
  const msg = _typeErrorMessage(target, "a `bigint`");
  return new TypeError(msg);
}

export function mustBeString(target: string): TypeError {
  const msg = _typeErrorMessage(target, "a `string`");
  return new TypeError(msg);
}

export function mustBeIterable(target: string): TypeError {
  const msg = _typeErrorMessage(target, "an `Iterable`");
  return new TypeError(msg);
}

export function mustBeAsyncIterable(target: string): TypeError {
  const msg = _typeErrorMessage(target, "an `AsyncIterable`");
  return new TypeError(msg);
}

export function mustBeUintN(
  bits: TypeAlias.safeint,
  target: string,
): TypeError {
  const msg = _typeErrorMessage(
    target,
    `a ${bits}-bit unsigned integer of type \`number\``,
  );
  return new TypeError(msg);
}

export function mustBeBigUintN(
  bits: TypeAlias.safeint,
  target: string,
): TypeError {
  const msg = _typeErrorMessage(
    target,
    `a ${bits}-bit unsigned integer of type \`bigint\``,
  );
  return new TypeError(msg);
}

export function mustBeArrayBuffer(target: string): TypeError {
  const msg = _typeErrorMessage(target, "an `ArrayBuffer`");
  return new TypeError(msg);
}

export function mustBeNonSharedUint8Array(target: string): TypeError {
  const msg = _typeErrorMessage(
    target,
    "an `Uint8Array` that references an `ArrayBuffer`",
  );
  return new TypeError(msg);
}
