import { isNullOrUndefined } from "./_primitive.mts";

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
