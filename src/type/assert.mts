import type { uint8 } from "./_def.mts";
import * as Exception from "./error.mts";
import {
  isArrayBuffer,
  isAsyncIterable,
  isBigInt,
  isIterable,
  isNonSharedUint8Array,
  isString,
  isUint8,
} from "./check.mts";

export function assertBigInt(
  test: unknown,
  targetLabel: string,
): asserts test is bigint {
  if (isBigInt(test) !== true) {
    throw Exception.mustBeBigInt(targetLabel);
  }
}

export function assertString(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (isString(test) !== true) {
    throw Exception.mustBeString(targetLabel);
  }
}

export function assertIterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is Iterable<T> {
  if (isIterable(test) !== true) {
    throw Exception.mustBeIterable(targetLabel);
  }
}

export function assertAsyncIterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is AsyncIterable<T> {
  if (isAsyncIterable(test) !== true) {
    throw Exception.mustBeAsyncIterable(targetLabel);
  }
}

export function assertUint8(
  test: unknown,
  targetLabel: string,
): asserts test is uint8 {
  if (isUint8(test) !== true) {
    throw Exception.mustBeUintN(8, targetLabel);
  }
}

export function assertArrayBuffer(
  test: unknown,
  targetLabel: string,
): asserts test is ArrayBuffer {
  if (isArrayBuffer(test) !== true) {
    throw Exception.mustBeArrayBuffer(targetLabel);
  }
}

export function assertNonSharedUint8Array(
  test: unknown,
  targetLabel: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (isNonSharedUint8Array(test) !== true) {
    throw Exception.mustBeNonSharedUint8Array(targetLabel);
  }
}
