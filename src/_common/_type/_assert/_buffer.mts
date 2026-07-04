export function isArrayBuffer(test: unknown): test is ArrayBuffer {
  return test instanceof ArrayBuffer;
}

export function isNonSharedUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBuffer> {
  return (test instanceof Uint8Array) && isArrayBuffer(test.buffer);
}
