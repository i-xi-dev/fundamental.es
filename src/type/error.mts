import type { TypeAlias } from "../_internal/type_alias/mod.mts";

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function mustBe(typeDesc: string, target: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function mustBeBigInt(target: string): TypeError {
  return mustBe("a `bigint`", target);
}

export function mustBeString(target: string): TypeError {
  return mustBe("a `string`", target);
}

export function mustBeIterable(target: string): TypeError {
  return mustBe("an `Iterable`", target);
}

export function mustBeAsyncIterable(target: string): TypeError {
  return mustBe("an `AsyncIterable`", target);
}

export function mustBeUintN(
  bits: TypeAlias.safeint,
  target: string,
): TypeError {
  return mustBe(`a ${bits}-bit unsigned integer of type \`number\``, target);
}

export function mustBeBigUintN(
  bits: TypeAlias.safeint,
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
