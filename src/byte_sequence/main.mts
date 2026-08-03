import { _Type } from "../_common/mod.mts";

function _equals(
  self: _Type.Bytes,
  other: _Type.Bytes | Array<_Type.uint8>,
): boolean {
  if (self.length !== other.length) {
    return false;
  }
  return _startsWith(self, other);
}

function _duplicate() {
}

function _startsWith(
  self: _Type.Bytes,
  other: _Type.Bytes | Array<_Type.uint8>,
): boolean {
  if (self.length < other.length) {
    return false;
  }

  for (let i = 0; i < other.length; i++) {
    if (self[i] !== other[i]) {
      return false;
    }
  }

  return true;
}

function _otherIsValid(
  test: unknown,
): test is _Type.Bytes | Array<_Type.uint8> {
  if (_Type.isNonSharedUint8Array(test)) {
    return true;
  } else if (Array.isArray(test)) {
    if (test.every((i) => _Type.isUint8(i))) {
      return true;
    }
  }
  return false;
}

export class ByteSequence {
  readonly #bytes: _Type.Bytes;

  private constructor(bytes: _Type.Bytes) {
    this.#bytes = bytes;
  }

  equals(
    other: ByteSequence | _Type.Bytes | Array</* _Type.uint8 */ number>,
  ): boolean {
    if (other instanceof ByteSequence) {
      return _equals(this.#bytes, other.#bytes);
    } else if (_otherIsValid(other)) {
      return _equals(this.#bytes, other);
    } else {
      return false;
    }
  }

  duplicate() {
  }

  startsWith(
    fragment: ByteSequence | _Type.Bytes | Array</* _Type.uint8 */ number>,
  ) {
    if (fragment instanceof ByteSequence) {
      return _startsWith(this.#bytes, fragment.#bytes);
    } else if (_otherIsValid(fragment)) {
      return _startsWith(this.#bytes, fragment);
    } else {
      return false;
    }
  }
}

export namespace ByteSequence {
}
