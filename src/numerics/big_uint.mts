import * as Byte from "../byte/mod.mts";
import * as Range from "./range/mod.mts";
import { _biguint } from "../_common/_type/_typedef/_number.mts";
import { _normalizeOffset } from "./_uint.mts";
import { _T, BigIntUtils, Io } from "../_common/mod.mts";
import { ByteOrder } from "../byte_order.mts";
import { Exception } from "../_internal/mod.mts";

export interface BigUint<T extends bigint> {
  get MIN_VALUE(): T;
  get MAX_VALUE(): T;
  get BIT_LENGTH(): _T.safeint;
  get BYTE_LENGTH(): _T.safeint;
  get [Symbol.toStringTag](): string;
  fromBytes(bytes: _T.Bytes, byteOrder?: ByteOrder): T;
  toBytes(uint: /* T */ bigint, byteOrder?: ByteOrder): _T.Bytes;
  bitwiseAnd(a: /* T */ bigint, b: /* T */ bigint): T;
  bitwiseOr(a: /* T */ bigint, b: /* T */ bigint): T;
  bitwiseXOr(a: /* T */ bigint, b: /* T */ bigint): T;
  //XXX bitwiseNot()
  rotateLeft(value: /* T */ bigint, offset: _T.safeint): T;
  //XXX rotateRight()
  truncateFrom(value: bigint): T;
  saturateFrom(value: bigint): T;
}

function _extractByte(unit: _biguint, pos: _T.safeint): _T.uint8 {
  const x1 = 0x100n ** BigInt(pos);
  const x2 = (unit >= x1) ? (unit % x1) : unit;
  return Math.trunc(Number(x2 / (0x100n ** BigInt(pos - 1)))) as _T.uint8;
}

export class _BigUintImpl<T extends _biguint> implements BigUint<T> {
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
    _T.assertNonSharedUint8Array(bytes, "Input");
    if (bytes.length !== this.#byteLength) {
      throw Exception.LengthMismatch.exact("input", this.#byteLength);
    }

    const resolvedByteOrder = Io.resolveByteOrder(byteOrder);

    const x = (resolvedByteOrder === ByteOrder.LITTLE_ENDIAN)
      ? [...bytes]
      : [...bytes].reverse();

    let result = BigInt(x[0]);
    for (let i = 1; i < x.length; i++) {
      result += BigInt(x[i]) * BigInt(0x100 ** i);
    }

    if (result > this.#range.max) { // #bitLength % 8 === 0のときは発生しない
      throw Exception.RangeOverflow.bigUintN(this.#bitLength, "Input");
    }
    return result as T;
  }

  toBytes(uint: bigint, byteOrder?: ByteOrder): _T.Bytes {
    if (this.#range.contains(uint) !== true) {
      throw Exception.TypeMismatch.bigUintN(this.#bitLength, "Input");
    }

    const resolvedByteOrder = Io.resolveByteOrder(byteOrder);

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

  #bitwiseOp(
    a: bigint,
    b: bigint,
    f: (fa: bigint, fb: bigint) => T,
  ): T {
    if ((this.#range.contains(a) && this.#range.contains(b)) !== true) {
      throw Exception.TypeMismatch.bigUintN(this.#bitLength, "Input");
    }

    return f(a, b);
  }

  #and(a: bigint, b: bigint): T {
    return (a & b) as T;
  }

  #or(a: bigint, b: bigint): T {
    return (a | b) as T;
  }

  #xOr(a: bigint, b: bigint): T {
    return (a ^ b) as T;
  }

  bitwiseAnd(a: bigint, b: bigint): T {
    return this.#bitwiseOp(a, b, this.#and);
  }

  bitwiseOr(a: bigint, b: bigint): T {
    return this.#bitwiseOp(a, b, this.#or);
  }

  bitwiseXOr(a: bigint, b: bigint): T {
    return this.#bitwiseOp(a, b, this.#xOr);
  }

  rotateLeft(value: bigint, offset: _T.safeint): T {
    if (this.#range.contains(value) !== true) {
      throw Exception.TypeMismatch.bigUintN(this.#bitLength, "Input");
    }
    _T.assertSafeInt(offset, "Offset");

    const normalizedOffset = _normalizeOffset(offset, this.#bitLength);
    if (normalizedOffset === 0) {
      return value;
    }

    const bigIntOffset = BigInt(normalizedOffset);
    const p1 = value << bigIntOffset;
    const p2 = value >> (BigInt(this.#bitLength) - bigIntOffset);
    return ((p1 | p2) & this.#range.max) as T;
  }

  truncateFrom(value: bigint): T {
    _T.assertBigInt(value, "Input");

    return BigInt.asUintN(this.#bitLength, value) as T;
  }

  saturateFrom(value: bigint): T {
    _T.assertBigInt(value, "Input");

    return BigIntUtils.clamp<T>(value, this.#range.min, this.#range.max);
  }
}

export const BigUint64: BigUint<_T.biguint64> = new _BigUintImpl(64);
export const BigUint128: BigUint<_T.biguint128> = new _BigUintImpl(128);
