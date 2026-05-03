export function isNonSharedUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBuffer> {
  return (test instanceof Uint8Array) && (test.buffer instanceof ArrayBuffer);
}
