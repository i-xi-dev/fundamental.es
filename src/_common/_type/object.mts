import { Type, TypeAlias } from "../../type/mod.mts";

export function isNonNullObject(test: unknown): test is NonNullable<object> {
  return (typeof test === "object") && (Type.isNullOrUndefined(test) !== true);
}

export function isSafeIntArray(
  test: unknown,
): test is Array<TypeAlias.safeint> {
  return Array.isArray(test) && test.every((i) => Number.isSafeInteger(i));
}

export function isIterable<T>(test: unknown): test is Iterable<T> {
  return (Type.isNullOrUndefined(test) !== true) &&
    (Type.isNullOrUndefined(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.iterator]: any })[Symbol.iterator], // inやReflectだとプリミティブを検査できない
    ) !== true);
}

export function isAsyncIterable<T>(test: unknown): test is AsyncIterable<T> {
  return (Type.isNullOrUndefined(test) !== true) &&
    (Type.isNullOrUndefined(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.asyncIterator]: any })[Symbol.asyncIterator], // inやReflectだとプリミティブを検査できない
    ) !== true);
}
