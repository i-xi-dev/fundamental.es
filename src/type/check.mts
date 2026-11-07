import type { char7 } from "./_def/char/char7.mts";
import type { char8 } from "./_def/char/char8.mts";
import type { codeplane } from "./_def/code_plane.mts";
import type { safeint } from "../_internal/type_alias/_def/_number_alias.mts";
import type { uint7 } from "./_def/uint/uint7.mts";
import type { uint8 } from "./_def/uint/uint8.mts";

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

export function isUint7(test: unknown): test is uint7 {
  return Number.isSafeInteger(test) && _inRange(test as safeint, 0, 0x7F);
}

export function isUint8(test: unknown): test is uint8 {
  return Number.isSafeInteger(test) && _inRange(test as safeint, 0, 0xFF);
}

// deno-lint-ignore no-control-regex
const _char7Regex = /^[\u0000-\u007F]$/;
export function isChar7(test: unknown): test is char7 {
  return isString(test) && _char7Regex.test(test);
}

// deno-lint-ignore no-control-regex
const _char8Regex = /^[\u0000-\u00FF]$/;
export function isChar8(test: unknown): test is char8 {
  return isString(test) && _char8Regex.test(test);
}

export function isCodePlane(test: unknown): test is codeplane {
  return Number.isSafeInteger(test) && _inRange(test as safeint, 0, 16);
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

export function isArrayOfUint8(test: unknown): test is Array<uint8> {
  return Array.isArray(test) && test.every((i) => isUint8(i));
}
