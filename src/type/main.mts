import type { safeint } from "../type_alias/mod.mts";
import type { uint8 } from "./_def.mts";

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

export function isNumber(test: unknown): test is number {
  return (typeof test === "number");
}

export function isString(test: unknown): test is string {
  return (typeof test === "string");
}

export function isNullOrUndefined(test: unknown): test is null | undefined {
  return (test === null) || (test === undefined);
}

export function isNonNullObject(test: unknown): test is NonNullable<object> {
  return (typeof test === "object") && (isNullOrUndefined(test) !== true);
}

export function isIterable<T>(test: unknown): test is Iterable<T> {
  return (isNullOrUndefined(test) !== true) &&
    (isNullOrUndefined(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.iterator]: any })[Symbol.iterator], // inやReflectだとプリミティブを検査できない
    ) !== true);
}

export function isAsyncIterable<T>(test: unknown): test is AsyncIterable<T> {
  return (isNullOrUndefined(test) !== true) &&
    (isNullOrUndefined(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.asyncIterator]: any })[Symbol.asyncIterator], // inやReflectだとプリミティブを検査できない
    ) !== true);
}

function _inRange(test: safeint, min: safeint, max: safeint): boolean {
  return (test >= min) && (test <= max);
}

export function isUint8(test: unknown): test is uint8 {
  return Number.isSafeInteger(test) && _inRange(test as safeint, 0, 0xFF);
}

export function isArrayBuffer(test: unknown): test is ArrayBuffer { //XXX realm違いの場合
  return test instanceof ArrayBuffer;
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
  return isUint8Array(test) && isArrayBuffer(test.buffer);
}
