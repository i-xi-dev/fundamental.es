// realm違いは偽になる
export function _isSharedArrayBuffer(test: unknown): test is SharedArrayBuffer {
  // ブラウザだと非securecontxtの場合そもそも存在しない
  return ("SharedArrayBuffer" in globalThis) &&
    (test instanceof SharedArrayBuffer);
}
