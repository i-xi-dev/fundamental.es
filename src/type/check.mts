import type { _safeint } from "../numerics/_/_type_alias/_def/_defs.mts";
import type { _uint7 } from "../numerics/_/_type/_def/_uint7.mts";
import type { _uint8 } from "../numerics/_/_type/_def/_uint8.mts";
import { _isArrayBuffer } from "../_/_type/_array_buffer.mts";
import { _isUint8 } from "../numerics/_/_type/_uint8.mts";

export function isNullOrUndefined(test: unknown): test is null | undefined {
  return (test === null) || (test === undefined);
}

export function __isNullOrUndefined(test: unknown): test is null | undefined {
  return (test === null) || (test === undefined);
}

export function isSharedArrayBuffer(test: unknown): test is SharedArrayBuffer { //XXX realm違いの場合
  // ブラウザだと非securecontxtの場合そもそも存在しない
  return ("SharedArrayBuffer" in globalThis) &&
    (test instanceof SharedArrayBuffer);
}

export function isUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBufferLike> { //XXX realm違いの場合
  return test instanceof Uint8Array;
}

export function isNonSharedUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBuffer> { //XXX realm違いの場合
  return isUint8Array(test) && _isArrayBuffer(test.buffer);
}

export function isArrayOfUint8(test: unknown): test is Array<_uint8> {
  return Array.isArray(test) && test.every((i) => _isUint8(i));
}
