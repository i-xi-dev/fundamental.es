import * as Byte from "../byte/mod.mts";
import { _T } from "../_common/mod.mts";
import { _unit } from "../_common/_type/_typedef/_number.mts";

export interface _Uint<T extends _T.safeint> {
  get MIN_VALUE(): T;
  get MAX_VALUE(): T;
  get BIT_LENGTH(): _T.safeint;
  get [Symbol.toStringTag](): string;
  // bitwiseAnd(a: T, b: T): T;
}

export class _UintImpl<T extends _unit> implements _Uint<T> {
  readonly #bitLength: _T.safeint; // non-negative integer
  readonly #byteLength: _T.safeint; // non-negative integer
  readonly #size: _T.safeint; // non-negative integer
  readonly #min: T;
  readonly #max: T;

  constructor(bitLength: _T.safeint) {
    this.#bitLength = bitLength;
    this.#byteLength = Math.ceil(bitLength / Byte.BITS);
    this.#size = 2 ** bitLength;
    this.#min = 0 as T;
    this.#max = (this.#size - 1) as T;
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
    return `Uint${this.#bitLength}`;
  }

  // bitwiseAnd(a: T, b: T): T {
  //   this.#assert(a, `\`Uint${this.#bitLength}.bitwiseAnd\` argument1`);
  //   this.#assert(b, `\`Uint${this.#bitLength}.bitwiseAnd\` argument2`);

  //   if (this.#bitLength < 32) {
  //     return (a & b) as T;
  //   } else if (this.#bitLength === 32) {
  //     return this.#bitOperateUint32(a, b, _BitOperation.AND) as T;
  //   }

  //   // ビット演算子はInt32で演算されるので符号を除くと31ビットまでしか演算できない
  //   const aBytes = this.toBytes(a);
  //   const bBytes = this.toBytes(b);
  //   const r = new Uint8Array(this.#byteLength);
  //   for (let i = 0; i < r.length; i++) {
  //     r[i] = aBytes[i] & bBytes[i];
  //   }
  //   return this.fromBytes(r);
  // }
}
