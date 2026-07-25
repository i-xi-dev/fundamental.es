import { TypeMismatchError } from "../../../_internal/mod.mts";

export function isArrayBuffer(test: unknown): test is ArrayBuffer {
  return test instanceof ArrayBuffer;
}

export function assertArrayBuffer(
  test: unknown,
  targetLabel: string,
): asserts test is ArrayBuffer {
  if (isArrayBuffer(test) !== true) {
    throw TypeMismatchError.arrayBuffer(targetLabel);
  }
}

export function isNonSharedUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBuffer> {
  return (test instanceof Uint8Array) && isArrayBuffer(test.buffer);
}

export function assertNonSharedUint8Array(
  test: unknown,
  targetLabel: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (isNonSharedUint8Array(test) !== true) {
    throw TypeMismatchError.bytes(targetLabel);
  }
}
