import { isNullOrUndefined } from "./_primitive.mts";
import { TypeMismatchError } from "../../../_internal/mod.mts";

export function isIterable<T>(test: unknown): test is Iterable<T> {
  return (isNullOrUndefined(test) !== true) &&
    (isNullOrUndefined(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.iterator]: any })[Symbol.iterator], // inやReflectだとプリミティブを検査できない
    ) !== true);
}

export function assertIterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is Iterable<T> {
  if (isIterable(test) !== true) {
    throw TypeMismatchError.iterable(targetLabel);
  }
}

export function isAsyncIterable<T>(test: unknown): test is AsyncIterable<T> {
  return (isNullOrUndefined(test) !== true) &&
    (isNullOrUndefined(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.asyncIterator]: any })[Symbol.asyncIterator], // inやReflectだとプリミティブを検査できない
    ) !== true);
}

export function assertAsyncIterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is AsyncIterable<T> {
  if (isAsyncIterable(test) !== true) {
    throw TypeMismatchError.asyncIterable(targetLabel);
  }
}
