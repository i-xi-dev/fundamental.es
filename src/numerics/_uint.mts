import * as _InputError from "../_internal/_input_error.mts";
import * as Byte from "../byte/mod.mts";
import * as Range from "./range/mod.mts";
import { _resolveByteOrder } from "../_internal/_proc.mts";
import { _T } from "../_common/mod.mts";
import { _unit } from "../_common/_type/_typedef/_number.mts";
import { ByteOrder } from "../byte_order.mts";

export interface _Uint<T extends _T.safeint> {
  get MIN_VALUE(): T;
  get MAX_VALUE(): T;
  get BIT_LENGTH(): _T.safeint;
  get BYTE_LENGTH(): _T.safeint;
  get [Symbol.toStringTag](): string;
  fromBytes(bytes: _T.Bytes, byteOrder?: ByteOrder): T;
  toBytes(uint: _T.safeint, byteOrder?: ByteOrder): _T.Bytes;
  bitwiseAnd(a: _T.safeint, b: _T.safeint): T;
  bitwiseOr(a: _T.safeint, b: _T.safeint): T;
  bitwiseXOr(a: _T.safeint, b: _T.safeint): T;
}

function _extractByte(unit: _unit, pos: _T.safeint): _T.uint8 {
  const x1 = 0x100 ** pos;
  const x2 = (unit >= x1) ? (unit % x1) : unit;
  return Math.trunc(x2 / (0x100 ** (pos - 1))) as _T.uint8;
}

export class _UintImpl<T extends _unit> implements _Uint<T> {
  readonly #bitLength: _T.safeint; // non-negative integer
  readonly #byteLength: _T.safeint; // non-negative integer
  readonly #size: _unit;
  readonly #range: Range.ClosedRange<_T.safeint, T>;

  constructor(bitLength: _T.safeint) {
    if (_T.isSafeInt(bitLength) && (bitLength > 0) && (bitLength <= 48)) {
      this.#bitLength = bitLength;
      this.#byteLength = Math.ceil(bitLength / Byte.BITS);
      this.#size = 2 ** bitLength;
      const min = 0 as T;
      const max = (this.#size - 1) as T;
      this.#range = Range.safeIntClosedRange<T>(min, max);
    } else {
      // コンストラクターは公開しないのでありえない
      throw new TypeError("--internal-error");
    }
  }

  get MIN_VALUE(): T {
    return this.#range.min;
  }

  get MAX_VALUE(): T {
    return this.#range.max;
  }

  get BIT_LENGTH(): _T.safeint {
    return this.#bitLength;
  }

  get BYTE_LENGTH(): _T.safeint {
    return this.#byteLength;
  }

  get [Symbol.toStringTag](): string {
    return `Uint${this.#bitLength}`;
  }

  fromBytes(bytes: _T.Bytes, byteOrder?: ByteOrder): T {
    if (_T.isNonSharedUint8Array(bytes) !== true) {
      throw _InputError.typeMismatch_Bytes();
    }
    if (bytes.length !== this.#byteLength) {
      throw _InputError.lengthMismatch(this.#byteLength);
    }

    const resolvedByteOrder = _resolveByteOrder(byteOrder);

    //XXX 32以下はUint32Arrayにした方が多分速い

    const x = (resolvedByteOrder === ByteOrder.LITTLE_ENDIAN)
      ? [...bytes]
      : [...bytes].reverse();

    let result = x[0];
    for (let i = 1; i < x.length; i++) {
      result += x[i] * (0x100 ** i);
    }

    if (result > this.#range.max) { // #bitLength % 8 === 0のときは発生しない
      throw _InputError.typeOverflow(`Uint${this.#bitLength}`);
    }
    return result as T;
  }

  toBytes(uint: _T.safeint, byteOrder?: ByteOrder): _T.Bytes {
    if (this.#range.contains(uint) !== true) {
      throw _InputError.typeMismatch_Uint(this.#bitLength);
    }

    const resolvedByteOrder = _resolveByteOrder(byteOrder);

    if (this.#byteLength === 1) {
      return Uint8Array.of(uint);
    }

    const bytes: Array<_T.uint8> = [];
    bytes.push((uint % 0x100) as _T.uint8);
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
    a: _T.safeint,
    b: _T.safeint,
    f: (fa: _T.safeint, fb: _T.safeint) => T,
  ): T {
    if ((this.#range.contains(a) && this.#range.contains(b)) !== true) {
      throw _InputError.typeMismatch_Uint(this.#bitLength);
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

  #and(a: _T.safeint, b: _T.safeint): T {
    return (a & b) as T;
  }

  #or(a: _T.safeint, b: _T.safeint): T {
    return (a | b) as T;
  }

  #xOr(a: _T.safeint, b: _T.safeint): T {
    return (a ^ b) as T;
  }

  bitwiseAnd(a: _T.safeint, b: _T.safeint): T {
    return this.#bitwiseOp(a, b, this.#and);
  }

  bitwiseOr(a: _T.safeint, b: _T.safeint): T {
    return this.#bitwiseOp(a, b, this.#or);
  }

  bitwiseXOr(a: _T.safeint, b: _T.safeint): T {
    return this.#bitwiseOp(a, b, this.#xOr);
  }
}

export const Uint6: _Uint<_T.uint6> = new _UintImpl(6);
export const Uint7: _Uint<_T.uint7> = new _UintImpl(7);
export const Uint8: _Uint<_T.uint8> = new _UintImpl(8);
export const Uint16: _Uint<_T.uint16> = new _UintImpl(16);
export const Uint24: _Uint<_T.uint24> = new _UintImpl(24);
export const Uint32: _Uint<_T.uint32> = new _UintImpl(32);
export const Uint48: _Uint<_T.uint48> = new _UintImpl(48);
