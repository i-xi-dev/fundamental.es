import { _TypeError } from "../../_internal/mod.mts";
import { _T } from "../mod.mts";

export function iterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is Iterable<T> {
  if (_T.isIterable(test) !== true) {
    throw _TypeError.iterable(targetLabel);
  }
}

export function asyncIterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is AsyncIterable<T> {
  if (_T.isAsyncIterable(test) !== true) {
    throw _TypeError.asyncIterable(targetLabel);
  }
}

export function arrayBuffer(
  test: unknown,
  targetLabel: string,
): asserts test is ArrayBuffer {
  if (_T.isArrayBuffer(test) !== true) {
    throw _TypeError.arrayBuffer(targetLabel);
  }
}

export function nonSharedUint8Array(
  test: unknown,
  targetLabel: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (_T.isNonSharedUint8Array(test) !== true) {
    throw _TypeError.bytes(targetLabel);
  }
}
