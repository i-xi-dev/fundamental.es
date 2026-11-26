import { _isFunction } from "./_function.mts";
import { _mustBe } from "../_.mts";
import { __isNullOrUndefined } from "../../type/check.mts";

// ・[Symbol.asyncIterator]が関数であるかしかチェックしない（本当にイテレーターを返すかどうかはわからない）
// ・AsyncIterable<T>のTは検査しようがない（検査したらイテレーターを消費してしまう）
export function _isAsyncIterable(
  test: unknown,
): test is AsyncIterable<unknown> {
  return (__isNullOrUndefined(test) !== true) &&
    (_isFunction(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.asyncIterator]: any })[Symbol.asyncIterator],
      // inやReflectだとプリミティブを検査できない
    ) === true);
}

function _mustBeAsyncIterable(target: string): TypeError {
  return _mustBe("an `AsyncIterable`", target);
}

// ・[Symbol.asyncIterator]が関数であるかしかチェックしない（本当にイテレーターを返すかどうかはわからない）
// ・AsyncIterable<T>のTは検査しようがない（検査したらイテレーターを消費してしまう）
export function _assertAsyncIterable(
  test: unknown,
  label: string,
): asserts test is AsyncIterable<unknown> {
  if (_isAsyncIterable(test) !== true) {
    throw _mustBeAsyncIterable(label);
  }
}
