import type { _safeint } from "../numerics/_/_type_alias/_def/_defs.mts";

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function mustBe(typeDesc: string, target: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function __mustBe(typeDesc: string, target: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function mustBeIterable(target: string): TypeError {
  return mustBe("an `Iterable`", target);
}

export function mustBeAsyncIterable(target: string): TypeError {
  return mustBe("an `AsyncIterable`", target);
}

export function mustBeBigUintN(
  bits: _safeint,
  target: string,
): TypeError {
  return mustBe(`a ${bits}-bit unsigned integer of type \`bigint\``, target);
}

export function mustBeArrayBuffer(target: string): TypeError {
  return mustBe("an `ArrayBuffer`", target);
}

export function mustBeNonSharedUint8Array(target: string): TypeError {
  return mustBe("an `Uint8Array` that references an `ArrayBuffer`", target);
}
