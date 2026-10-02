import type { uint8 } from "./_def.mts";
import { _Error } from "../_common/mod.mts";
import {
  isArrayBuffer,
  isAsyncIterable,
  isBigInt,
  isIterable,
  isNonSharedUint8Array,
  isString,
  isUint8,
} from "./main.mts";

export function bigInt(
  test: unknown,
  targetLabel: string,
): asserts test is bigint {
  if (isBigInt(test) !== true) {
    throw _Error.Type.mustBeBigInt(targetLabel);
  }
}

export function string(
  test: unknown,
  targetLabel: string,
): asserts test is string {
  if (isString(test) !== true) {
    throw _Error.Type.mustBeString(targetLabel);
  }
}

export function iterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is Iterable<T> {
  if (isIterable(test) !== true) {
    throw _Error.Type.mustBeIterable(targetLabel);
  }
}

export function asyncIterable<T>(
  test: unknown,
  targetLabel: string,
): asserts test is AsyncIterable<T> {
  if (isAsyncIterable(test) !== true) {
    throw _Error.Type.mustBeAsyncIterable(targetLabel);
  }
}

export function uint8(
  test: unknown,
  targetLabel: string,
): asserts test is uint8 {
  if (isUint8(test) !== true) {
    throw _Error.Type.mustBeUintN(8, targetLabel);
  }
}

export function arrayBuffer(
  test: unknown,
  targetLabel: string,
): asserts test is ArrayBuffer {
  if (isArrayBuffer(test) !== true) {
    throw _Error.Type.mustBeArrayBuffer(targetLabel);
  }
}

export function nonSharedUint8Array(
  test: unknown,
  targetLabel: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (isNonSharedUint8Array(test) !== true) {
    throw _Error.Type.mustBeBytes(targetLabel);
  }
}
