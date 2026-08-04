import { _Type } from "../_common/mod.mts";
import { Uint16 } from "../numerics/mod.mts";

function _isByteArray(test: unknown): test is Array<_Type.uint8> {
  return Array.isArray(test) && test.every((i) => _Type.isUint8(i));
}

export type _Comparable =
  | ArrayBuffer
  | SharedArrayBuffer
  | ArrayBufferView<ArrayBuffer>
  | ArrayBufferView<SharedArrayBuffer>
  | Array</* _Type.uint8 */ number>;

export function _comparableToBytes(
  input: _Comparable,
): _Type.Bytes | Array<_Type.uint8> | null {
  if (_Type.isNonSharedUint8Array(input) === true) {
    return input;
  } else if (_Type.isArrayBuffer(input) === true) {
    return new Uint8Array(input);
  } else if (_Type.isSharedArrayBuffer(input) === true) {
    return Uint8Array.from(new Uint8Array(input));
  } else if (ArrayBuffer.isView(input) === true) {
    if (_Type.isArrayBuffer(input.buffer) === true) {
      return new Uint8Array(input.buffer);
    }
    if (_Type.isSharedArrayBuffer(input.buffer) === true) {
      return Uint8Array.from(new Uint8Array(input.buffer));
    }
  } else if (_isByteArray(input) === true) {
    return input;
  }
  return null;
}

export function _bytesStartsWith(
  self: _Type.Bytes,
  other: _Comparable,
): boolean {
  const otherBytes = _comparableToBytes(other);
  if (otherBytes === null) {
    return false;
  }

  if (self.length < otherBytes.length) {
    return false;
  }

  for (let i = 0; i < otherBytes.length; i++) {
    if (self[i] !== otherBytes[i]) {
      return false;
    }
  }

  return true;
}

export function _bytesEquals(
  self: _Type.Bytes,
  other: _Comparable,
): boolean {
  const otherBytes = _comparableToBytes(other);
  if (otherBytes === null) {
    return false;
  }

  if (self.length !== otherBytes.length) {
    return false;
  }
  return _bytesStartsWith(self, other);
}

export function _randomBytes(byteLength: _Type.safeint): ArrayBuffer {
  const buffer = new ArrayBuffer(byteLength);
  let bytesSpan: Uint8Array<ArrayBuffer>;
  let filled = 0;
  // getRandomValuesは16ビットまでなので16ビットずつ処理する
  while (filled < buffer.byteLength) {
    if ((filled + Uint16.MAX_VALUE) >= buffer.byteLength) {
      bytesSpan = new Uint8Array(
        buffer,
        filled,
        buffer.byteLength % Uint16.MAX_VALUE,
      );
      globalThis.crypto.getRandomValues(bytesSpan);
      break;
    }

    bytesSpan = new Uint8Array(buffer, filled, Uint16.MAX_VALUE);
    globalThis.crypto.getRandomValues(bytesSpan);
    filled += Uint16.MAX_VALUE;
  }
  return buffer;
}
