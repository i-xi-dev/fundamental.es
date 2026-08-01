import * as Byte from "../byte/mod.mts";
import * as Range from "./range/mod.mts";
import { _Assert, _Type, Io } from "../_common/mod.mts";
import { _clampFinite } from "./finite.mts";
import {
  _LengthMismatchError,
  _OperationError,
  _RangeError,
  _TypeError,
} from "../_internal/mod.mts";
import { _normalizeOffset } from "./_uint.mts";
import { _unit } from "../_common/_type/_typedef/_number.mts";
import { ByteOrder } from "../byte_order.mts";

export interface Uint<T extends _Type.safeint> {
  get MIN_VALUE(): T;
  get MAX_VALUE(): T;
  get BIT_LENGTH(): _Type.safeint;
  get BYTE_LENGTH(): _Type.safeint;
  get [Symbol.toStringTag](): string;
  fromBytes(bytes: _Type.Bytes, byteOrder?: ByteOrder): T;
  toBytes(uint: /* T */ _Type.safeint, byteOrder?: ByteOrder): _Type.Bytes;
  bitwiseAnd(a: /* T */ _Type.safeint, b: /* T */ _Type.safeint): T;
  bitwiseOr(a: /* T */ _Type.safeint, b: /* T */ _Type.safeint): T;
  bitwiseXOr(a: /* T */ _Type.safeint, b: /* T */ _Type.safeint): T;
  //XXX bitwiseNot()
  rotateLeft(value: /* T */ _Type.safeint, offset: _Type.safeint): T;
  //XXX rotateRight()
  truncateFrom(value: _Type.safeint): T;
  saturateFrom(value: _Type.safeint): T;
}

function _extractByte(unit: _unit, pos: _Type.safeint): _Type.uint8 {
  const x1 = 0x100 ** pos;
  const x2 = (unit >= x1) ? (unit % x1) : unit;
  return Math.trunc(x2 / (0x100 ** (pos - 1))) as _Type.uint8;
}

export class _UintImpl<T extends _unit> implements Uint<T> {
  readonly #bitLength: _Type.safeint; // non-negative integer
  readonly #byteLength: _Type.safeint; // non-negative integer
  readonly #size: _unit;
  readonly #range: Range.ClosedRange<_Type.safeint, T>;

  constructor(bitLength: _Type.safeint) {
    if (_Type.isSafeInt(bitLength) && (bitLength > 0) && (bitLength <= 48)) {
      this.#bitLength = bitLength;
      this.#byteLength = Math.ceil(bitLength / Byte.BITS);
      this.#size = 2 ** bitLength;
      const min = 0 as T;
      const max = (this.#size - 1) as T;
      this.#range = Range.safeIntClosedRange<T>(min, max);
    } else {
      // コンストラクターは公開しないのでありえない
      throw _OperationError.invalid("Unsupported bit length");
    }
  }

  get MIN_VALUE(): T {
    return this.#range.min;
  }

  get MAX_VALUE(): T {
    return this.#range.max;
  }

  get BIT_LENGTH(): _Type.safeint {
    return this.#bitLength;
  }

  get BYTE_LENGTH(): _Type.safeint {
    return this.#byteLength;
  }

  get [Symbol.toStringTag](): string {
    return `Uint${this.#bitLength}`;
  }

  fromBytes(bytes: _Type.Bytes, byteOrder?: ByteOrder): T {
    _Assert.nonSharedUint8Array(bytes, "Input");
    if (bytes.length !== this.#byteLength) {
      throw _LengthMismatchError.exact("input", this.#byteLength);
    }

    const resolvedByteOrder = Io.resolveByteOrder(byteOrder);

    //XXX 32以下はUint32Arrayにした方が多分速い

    const x = (resolvedByteOrder === ByteOrder.LITTLE_ENDIAN)
      ? [...bytes]
      : [...bytes].reverse();

    let result = x[0];
    for (let i = 1; i < x.length; i++) {
      result += x[i] * (0x100 ** i);
    }

    if (result > this.#range.max) { // #bitLength % 8 === 0のときは発生しない
      throw _RangeError.overflow(this.#range.max, "Input");
    }
    return result as T;
  }

  toBytes(uint: _Type.safeint, byteOrder?: ByteOrder): _Type.Bytes {
    if (this.#range.contains(uint) !== true) {
      throw _TypeError.uintN(this.#bitLength, "Input");
    }

    const resolvedByteOrder = Io.resolveByteOrder(byteOrder);

    if (this.#byteLength === 1) {
      return Uint8Array.of(uint);
    }

    const bytes: Array<_Type.uint8> = [];
    bytes.push((uint % 0x100) as _Type.uint8);
    for (let i = 2; i <= 6; i++) { // 16-48
      if (this.#bitLength >= (Byte.BITS * i)) {
        bytes.push(_extractByte(uint, i));
      }
    }
    return Uint8Array.from(
      (resolvedByteOrder === ByteOrder.LITTLE_ENDIAN) ? bytes : bytes.reverse(),
    );
  }

  #bitwiseOp(
    a: _Type.safeint,
    b: _Type.safeint,
    f: (fa: _Type.safeint, fb: _Type.safeint) => T,
  ): T {
    if ((this.#range.contains(a) && this.#range.contains(b)) !== true) {
      throw _TypeError.uintN(this.#bitLength, "Input");
    }

    if (this.#bitLength < 32) {
      return f(a, b);
    }

    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const aBytes = this.toBytes(a);
    const bBytes = this.toBytes(b);
    const r = new Uint8Array(this.#byteLength);
    for (let i = 0; i < r.length; i++) {
      r[i] = f(aBytes[i], bBytes[i]);
    }
    return this.fromBytes(r);
  }

  #and(a: _Type.safeint, b: _Type.safeint): T {
    return (a & b) as T;
  }

  #or(a: _Type.safeint, b: _Type.safeint): T {
    return (a | b) as T;
  }

  #xOr(a: _Type.safeint, b: _Type.safeint): T {
    return (a ^ b) as T;
  }

  bitwiseAnd(a: _Type.safeint, b: _Type.safeint): T {
    return this.#bitwiseOp(a, b, this.#and);
  }

  bitwiseOr(a: _Type.safeint, b: _Type.safeint): T {
    return this.#bitwiseOp(a, b, this.#or);
  }

  bitwiseXOr(a: _Type.safeint, b: _Type.safeint): T {
    return this.#bitwiseOp(a, b, this.#xOr);
  }

  rotateLeft(value: _Type.safeint, offset: _Type.safeint): T {
    if (this.#range.contains(value) !== true) {
      throw _TypeError.uintN(this.#bitLength, "Input");
    }
    _Assert.safeInt(offset, "Offset");

    const normalizedOffset = _normalizeOffset(offset, this.#bitLength);
    if (normalizedOffset === 0) {
      return value;
    }

    if (this.#bitLength < 32) {
      const p1 = value << normalizedOffset;
      const p2 = value >> (this.#bitLength - normalizedOffset);
      return ((p1 | p2) & this.#range.max) as T;
    }

    // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
    const bs = BigInt(value);
    return Number(
      ((bs << BigInt(normalizedOffset)) |
        (bs >> BigInt(this.#bitLength - normalizedOffset))) &
        BigInt(this.#range.max),
    ) as T;
    //TODO bigint使うと遅い
  }

  truncateFrom(value: _Type.safeint): T {
    _Assert.safeInt(value, "Input");

    if (this.#range.contains(value)) {
      return value as T;
    }

    if (value > 0) {
      return (value % this.#size) as T;
    } else {
      return (this.#size + (value % this.#size)) as T;
    }
  }

  saturateFrom(value: _Type.safeint): T {
    _Assert.safeInt(value, "Input");

    return _clampFinite<T>(value, this.#range.min, this.#range.max);
  }
}

export const Uint6: Uint<_Type.uint6> = new _UintImpl(6);
export const Uint7: Uint<_Type.uint7> = new _UintImpl(7);
export const Uint8: Uint<_Type.uint8> = new _UintImpl(8);
export const Uint16: Uint<_Type.uint16> = new _UintImpl(16);
export const Uint24: Uint<_Type.uint24> = new _UintImpl(24);
export const Uint32: Uint<_Type.uint32> = new _UintImpl(32);
export const Uint48: Uint<_Type.uint48> = new _UintImpl(48);
