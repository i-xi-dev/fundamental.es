import { Type } from "../../type/mod.mts";

export function isSharedArrayBuffer(test: unknown): test is SharedArrayBuffer {
  // ブラウザだと非securecontxtの場合そもそも存在しない
  return ("SharedArrayBuffer" in globalThis) &&
    (test instanceof SharedArrayBuffer);
}

export function isNonSharedUint8Array(
  test: unknown,
): test is Uint8Array<ArrayBuffer> {
  return (test instanceof Uint8Array) && Type.isArrayBuffer(test.buffer);
}
