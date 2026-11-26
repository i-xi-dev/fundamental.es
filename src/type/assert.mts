import type { _uint8 } from "../numerics/_/_type/_def/_uint8.mts";
import * as Exception from "./error.mts";
import {
  isArrayBuffer,
  isAsyncIterable,
  isIterable,
  isNonSharedUint8Array,
} from "./check.mts";

export function assertIterable<T>(
  test: unknown,
  label: string,
): asserts test is Iterable<T> {
  if (isIterable(test) !== true) {
    throw Exception.mustBeIterable(label);
  }
}

export function assertAsyncIterable<T>(
  test: unknown,
  label: string,
): asserts test is AsyncIterable<T> {
  if (isAsyncIterable(test) !== true) {
    throw Exception.mustBeAsyncIterable(label);
  }
}

export function assertArrayBuffer(
  test: unknown,
  label: string,
): asserts test is ArrayBuffer {
  if (isArrayBuffer(test) !== true) {
    throw Exception.mustBeArrayBuffer(label);
  }
}

export function assertNonSharedUint8Array(
  test: unknown,
  label: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (isNonSharedUint8Array(test) !== true) {
    throw Exception.mustBeNonSharedUint8Array(label);
  }
}
