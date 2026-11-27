import { _isFunction } from "./_function.mts";
import { _isNullOrUndefined, _mustBe } from "../_.mts";

// ・[Symbol.iterator]が関数であるかしかチェックしない（本当にイテレーターを返すかどうかはわからない）
// ・Iterable<T>のTは検査しようがない（検査したらイテレーターを消費してしまう）
export function _isIterable(test: unknown): test is Iterable<unknown> {
  return (_isNullOrUndefined(test) !== true) &&
    (_isFunction(
      // deno-lint-ignore no-explicit-any
      (test as { [Symbol.iterator]: any })[Symbol.iterator],
      // inやReflectだとプリミティブを検査できない
    ) === true);
}

function _mustBeIterable(target: string): TypeError {
  return _mustBe("an `Iterable`", target);
}

// ・[Symbol.iterator]が関数であるかしかチェックしない（本当にイテレーターを返すかどうかはわからない）
// ・Iterable<T>のTは検査しようがない（検査したらイテレーターを消費してしまう）
export function _assertIterable(
  test: unknown,
  label: string,
): asserts test is Iterable<unknown> {
  if (_isIterable(test) !== true) {
    throw _mustBeIterable(label);
  }
}
