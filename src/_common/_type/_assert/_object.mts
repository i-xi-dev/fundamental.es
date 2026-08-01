import { _TypeError } from "../../../_internal/mod.mts";
import { isNullOrUndefined } from "./_primitive.mts";

export function isNonNullObject(test: unknown): test is object {
  return (typeof test === "object") && (isNullOrUndefined(test) !== true);
}

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
    throw _TypeError.iterable(targetLabel);
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
    throw _TypeError.asyncIterable(targetLabel);
  }
}
