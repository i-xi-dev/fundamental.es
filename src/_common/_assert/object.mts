import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";

export function iterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is Iterable<T> {
  if (_Type.isIterable(test) !== true) {
    throw _TypeError.iterable(targetLabel);
  }
}

export function asyncIterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is AsyncIterable<T> {
  if (_Type.isAsyncIterable(test) !== true) {
    throw _TypeError.asyncIterable(targetLabel);
  }
}

export function arrayBuffer(
  test: unknown,
  targetLabel: string,
): asserts test is ArrayBuffer {
  if (_Type.isArrayBuffer(test) !== true) {
    throw _TypeError.arrayBuffer(targetLabel);
  }
}

export function nonSharedUint8Array(
  test: unknown,
  targetLabel: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (_Type.isNonSharedUint8Array(test) !== true) {
    throw _TypeError.bytes(targetLabel);
  }
}
