import type { _uint8 } from "../numerics/_/_type/_def/_uint8.mts";
import * as Exception from "./error.mts";
import { isNonSharedUint8Array } from "./check.mts";
import { _isAsyncIterable } from "../_/_type/_async_iterable.mts";

export function assertNonSharedUint8Array(
  test: unknown,
  label: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (isNonSharedUint8Array(test) !== true) {
    throw Exception.mustBeNonSharedUint8Array(label);
  }
}
