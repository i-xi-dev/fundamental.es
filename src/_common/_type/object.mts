import { isNullOrUndefined } from "./primitive.mts";
import { isSafeInt } from "./number.mts";
import { safeint } from "./_typedef/mod.mts";

export function isNonNullObject(test: unknown): test is object {
  return (typeof test === "object") && (isNullOrUndefined(test) !== true);
}

export function isSafeIntArray(test: unknown): test is Array<safeint> {
  return Array.isArray(test) && test.every((i) => isSafeInt(i));
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
