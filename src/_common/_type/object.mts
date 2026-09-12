import { isNullOrUndefined } from "./primitive.mts";
import { TypeAlias } from "../../type/mod.mts";

export function isNonNullObject(test: unknown): test is object {
  return (typeof test === "object") && (isNullOrUndefined(test) !== true);
}

export function isSafeIntArray(
  test: unknown,
): test is Array<TypeAlias.safeint> {
  return Array.isArray(test) && test.every((i) => Number.isSafeInteger(i));
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
