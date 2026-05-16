import * as Byte from "../byte/mod.mts";
import { _T } from "../_common/mod.mts";
import { _biguint } from "../_common/_type/_typedef/_number.mts";

export interface _BigUint<T extends bigint> {
  get MIN_VALUE(): T;
  get MAX_VALUE(): T;
  get BIT_LENGTH(): _T.safeint;
  get BYTE_LENGTH(): _T.safeint;
  get [Symbol.toStringTag](): string;
  // bitwiseAnd(a: T, b: T): T;
}

export class _BigUintImpl<T extends _biguint> implements _BigUint<T> {
  readonly #bitLength: _T.safeint; // non-negative integer
  readonly #byteLength: _T.safeint; // non-negative integer
  readonly #size: _biguint;
  readonly #min: T;
  readonly #max: T;

  constructor(bitLength: _T.safeint) {
    if (_T.isSafeInt(bitLength) && (bitLength > 0)) {
      this.#bitLength = bitLength;
      this.#byteLength = Math.ceil(bitLength / Byte.BITS);
      this.#size = 2n ** BigInt(bitLength);
      this.#min = 0n as T;
      this.#max = (this.#size - 1n) as T;
    } else {
      // コンストラクターは公開しないのでありえない
      throw new TypeError("--internal-error");
    }
  }

  get MIN_VALUE(): T {
    return this.#min;
  }

  get MAX_VALUE(): T {
    return this.#max;
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
}

export const BigUint64: _BigUint<_T.biguint64> = new _BigUintImpl(64);
export const BigUint128: _BigUint<_T.biguint128> = new _BigUintImpl(128);
