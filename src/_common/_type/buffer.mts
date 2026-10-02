import { Type } from "../../type/mod.mts";

export function isNonSharedUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBuffer> {
  return (test instanceof Uint8Array) && Type.isArrayBuffer(test.buffer);
}
