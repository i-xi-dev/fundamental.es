import * as _InputError from "../_internal/_input_error.mts";
import * as Byte from "../byte/mod.mts";
import * as Range from "./range/mod.mts";
import { _biguint } from "../_common/_type/_typedef/_number.mts";
import { _resolveByteOrder } from "../_internal/_proc.mts";
import { _T } from "../_common/mod.mts";
import { ByteOrder } from "../byte_order.mts";

export interface _BigUint<T extends bigint> {
  get MIN_VALUE(): T;
  get MAX_VALUE(): T;
  get BIT_LENGTH(): _T.safeint;
  get BYTE_LENGTH(): _T.safeint;
  get [Symbol.toStringTag](): string;
  fromBytes(bytes: _T.Bytes, byteOrder?: ByteOrder): T;
  toBytes(uint: bigint, byteOrder?: ByteOrder): _T.Bytes;
  bitwiseAnd(a: bigint, b: bigint): T;
}

function _extractByte(unit: _biguint, pos: _T.safeint): _T.uint8 {
  const x1 = 0x100n ** BigInt(pos);
  const x2 = (unit >= x1) ? (unit % x1) : unit;
  return Math.trunc(Number(x2 / (0x100n ** BigInt(pos - 1)))) as _T.uint8;
}

export class _BigUintImpl<T extends _biguint> implements _BigUint<T> {
  readonly #bitLength: _T.safeint; // non-negative integer
  readonly #byteLength: _T.safeint; // non-negative integer
  readonly #size: _biguint;
  readonly #range: Range.ClosedRange<_biguint, T>;

  constructor(bitLength: _T.safeint) {
    if (_T.isSafeInt(bitLength) && (bitLength > 0)) {
      this.#bitLength = bitLength;
      this.#byteLength = Math.ceil(bitLength / Byte.BITS);
      this.#size = 2n ** BigInt(bitLength);
      const min = 0n as T;
      const max = (this.#size - 1n) as T;
      this.#range = Range.bigIntClosedRange<T>(min, max);
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
    return `BigUint${this.#bitLength}`;
  }

  fromBytes(bytes: _T.Bytes, byteOrder?: ByteOrder): T {
    if (_T.isNonSharedUint8Array(bytes) !== true) {
      throw _InputError.typeMismatch_Bytes();
    }
    if (bytes.length !== this.#byteLength) {
      throw _InputError.lengthMismatch(this.#byteLength);
    }

    const resolvedByteOrder = _resolveByteOrder(byteOrder);

    const x = (resolvedByteOrder === ByteOrder.LITTLE_ENDIAN)
      ? [...bytes]
      : [...bytes].reverse();

    let result = BigInt(x[0]);
    for (let i = 1; i < x.length; i++) {
      result += BigInt(x[i]) * BigInt(0x100 ** i);
    }

    if (result > this.#range.max) { // #bitLength % 8 === 0のときは発生しない
      throw _InputError.typeOverflow(`BigUint${this.#bitLength}`);
    }
    return result as T;
  }

  toBytes(uint: bigint, byteOrder?: ByteOrder): _T.Bytes {
    if (this.#range.contains(uint) !== true) {
      throw _InputError.typeMismatch_BigUint(this.#bitLength);
    }

    const resolvedByteOrder = _resolveByteOrder(byteOrder);

    if (this.#byteLength === 1) {
      return Uint8Array.of(Number(uint));
    }

    const bytes: Array<_T.uint8> = [];
    bytes.push(Number(uint % 0x100n) as _T.uint8);
    for (let i = 2; i <= 16; i++) { // 16-128 一旦128を上限とする
      if (this.#bitLength >= (Byte.BITS * i)) {
        bytes.push(_extractByte(uint, i));
      }
    }
    return Uint8Array.from(
      (resolvedByteOrder === ByteOrder.LITTLE_ENDIAN) ? bytes : bytes.reverse(),
    );
  }

  bitwiseAnd(a: bigint, b: bigint): T {
    if ((this.#range.contains(a) && this.#range.contains(b)) !== true) {
      throw _InputError.typeMismatch_BigUint(this.#bitLength);
    }

    return (a & b) as T;
  }
}

export const BigUint64: _BigUint<_T.biguint64> = new _BigUintImpl(64);
export const BigUint128: _BigUint<_T.biguint128> = new _BigUintImpl(128);
