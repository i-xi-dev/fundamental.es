import { _T } from "../_common/mod.mts";
import { Exception } from "../_internal/mod.mts";
import { ByteOrder } from "../byte_order.mts";
import {
  BigUint,
  BigUint64,
  Uint,
  Uint16,
  Uint32,
  Uint8,
} from "../numerics/mod.mts";

const _MAX_CAPACITY = 536_870_912;

const _DEFAULT_EXTENT = 1_048_576; //TODO growIfNeededで使う

const _ClampMode = {
  TRUNCATE: "truncate",
  SATURATE: "saturate",
} as const;

type _ClampMode = typeof _ClampMode[keyof typeof _ClampMode];

function _uintClamper<T extends _T.safeint>(
  x: Uint<T>,
  mode?: _ClampMode,
): (v: _T.safeint) => T {
  return (mode === _ClampMode.SATURATE)
    ? (v) => x.saturateFrom(v)
    : (v) => x.truncateFrom(v);
}

function _biguintClamper<T extends bigint>(
  x: BigUint<T>,
  mode?: _ClampMode,
): (v: bigint) => T {
  return (mode === _ClampMode.SATURATE)
    ? (v) => x.saturateFrom(v)
    : (v) => x.truncateFrom(v);
}

type _LoadOptions = {
  clampMode?: _ClampMode;
  byteOrder?: ByteOrder;
};

type _ToBufferOptions = {
  byteLength?: _T.safeint;
  //XXX fixLength?: boolean;
};

export class Builder {
  readonly #buffer: ArrayBuffer;
  readonly #view: Uint8Array<ArrayBuffer>;
  #index: _T.safeint;

  private constructor(capacity: _T.safeint, maxCapacity?: _T.safeint) {
    if (_T.isNonNegativeSafeInt(maxCapacity) === true) {
      let maxByteLength: _T.safeint;
      if (maxCapacity >= capacity) {
        maxByteLength = maxCapacity;
      } else {
        maxByteLength = capacity;
      }
      this.#buffer = new ArrayBuffer(capacity, { maxByteLength });
    } else {
      this.#buffer = new ArrayBuffer(capacity);
    }

    this.#view = new Uint8Array(this.#buffer);
    this.#index = 0;
  }

  get [Symbol.toStringTag](): string {
    return "ByteSequenceBuilder";
  }

  get detached(): boolean {
    return (this.#buffer.detached === true);
  }

  get capacity(): _T.safeint {
    this.#assertNonDetached();
    return this.#buffer.byteLength;
  }

  static create(
    capacity: _T.safeint,
    maxCapacity?: _T.safeint,
  ): Builder {
    if (_T.isNonNegativeSafeInt(capacity) !== true) {
      throw Exception.TypeMismatch.nonNegativeSafeInt("Capacity");
    }
    if (
      (_T.isNullOrUndefined(maxCapacity) ||
        _T.isNonNegativeSafeInt(maxCapacity)) !== true
    ) {
      throw Exception.TypeMismatch.nonNegativeSafeInt("Max-capacity");
    }
    return new Builder(capacity, maxCapacity);
  }

  appendUint8(byte: _T.safeint, options?: _LoadOptions): this {
    this.#assertNonDetached();
    // byteの型はsaturateFrom/truncateFromでチェックされる

    const clamped = (options?.clampMode === _ClampMode.SATURATE)
      ? Uint8.saturateFrom(byte)
      : Uint8.truncateFrom(byte);
    this.#appendByte(clamped);
    return this;
  }

  // - TypedArrayであるかに関係なくArrayBufferのbyte順通りにuint8で読み取る
  // - sourceBufferの部分範囲だけ追加したければ切り出してから渡せば良い
  // - SharedArrayBufferは弾く
  // - sourceBufferは読み取るだけなのでdetatch等しない（要らないなら自分で処分すること）
  loadFromArrayBuffer(sourceBuffer: ArrayBuffer): this {
    this.#assertNonDetached();
    if (_T.isArrayBuffer(sourceBuffer) !== true) {
      throw Exception.TypeMismatch.arrayBuffer("Input");
    }

    this.#appendBytes(new Uint8Array(sourceBuffer));
    return this;
  }

  loadFromUint8s(uint8s: Iterable<_T.safeint>, options?: _LoadOptions): this {
    this.#assertNonDetached();
    if (_T.isIterable(uint8s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    // let buffer: ArrayBuffer;
    // if (options?.clampMode === "saturate") {
    //   buffer = Uint8ClampedArray.from(uint8s).buffer;
    // }
    // buffer = Uint8Array.from(uint8s).buffer;
    // return this.loadFromArrayBuffer(buffer);

    const f = _uintClamper(Uint8, options?.clampMode);
    for (const uint8 of uint8s) {
      this.#appendByte(f(uint8));
    }
    return this;
  }

  async loadFromAsyncUint8s(
    uint8s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertNonDetached();
    if (_T.isAsyncIterable(uint8s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    for await (const v of uint8s) {
      this.appendUint8(v, options);
    }
    return this;
  }

  loadFromUint16s(uint16s: Iterable<_T.safeint>, options?: _LoadOptions): this {
    this.#assertNonDetached();
    if (_T.isIterable(uint16s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    const f = _uintClamper(Uint16, options?.clampMode);
    for (const uint16 of uint16s) {
      this.#appendBytes(Uint16.toBytes(f(uint16), options?.byteOrder));
    }
    return this;
  }

  async loadFromAsyncUint16s(
    uint16s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertNonDetached();
    if (_T.isAsyncIterable(uint16s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    const f = _uintClamper(Uint16, options?.clampMode);
    for await (const uint16 of uint16s) {
      this.#appendBytes(Uint16.toBytes(f(uint16), options?.byteOrder));
    }
    return this;
  }

  loadFromUint32s(uint32s: Iterable<_T.safeint>, options?: _LoadOptions): this {
    this.#assertNonDetached();
    if (_T.isIterable(uint32s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    const f = _uintClamper(Uint32, options?.clampMode);
    for (const uint32 of uint32s) {
      this.#appendBytes(Uint32.toBytes(f(uint32), options?.byteOrder));
    }
    return this;
  }

  async loadFromAsyncUint32s(
    uint32s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertNonDetached();
    if (_T.isAsyncIterable(uint32s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    const f = _uintClamper(Uint32, options?.clampMode);
    for await (const uint32 of uint32s) {
      this.#appendBytes(Uint32.toBytes(f(uint32), options?.byteOrder));
    }
    return this;
  }

  loadFromBigUint64s(
    biguint64s: Iterable<bigint>,
    options?: _LoadOptions,
  ): this {
    this.#assertNonDetached();
    if (_T.isIterable(biguint64s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    const f = _biguintClamper(BigUint64, options?.clampMode);
    for (const biguint64 of biguint64s) {
      this.#appendBytes(BigUint64.toBytes(f(biguint64), options?.byteOrder));
    }
    return this;
  }

  async loadFromAsyncBigUint64s(
    biguint64s: AsyncIterable<bigint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertNonDetached();
    if (_T.isAsyncIterable(biguint64s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    const f = _biguintClamper(BigUint64, options?.clampMode);
    for await (const biguint64 of biguint64s) {
      this.#appendBytes(BigUint64.toBytes(f(biguint64), options?.byteOrder));
    }
    return this;
  }

  toArrayBuffer(options?: _ToBufferOptions): ArrayBuffer {
    this.#assertNonDetached();
    // const buffer = (options?.fixLength === true)
    //   ? this.#bytes.buffer.transferToFixedLength(options?.byteLength)
    //   : this.#bytes.buffer.transfer(options?.byteLength);
    // return buffer; //XXX-$105 v8のバグ resizableなArrayBufferのUint8ArrayでのtoHex()に失敗
    const length = _T.isNonNegativeSafeInt(options?.byteLength)
      ? options?.byteLength
      : this.#index;
    return this.#buffer.transferToFixedLength(length);
  }

  toBytes(options?: _ToBufferOptions): _T.Bytes {
    return new Uint8Array(this.toArrayBuffer(options));
  }

  #appendByte(byte: _T.uint8): void {
    this.#growIfNeeded(1);
    this.#view[this.#index] = byte;
    this.#index += 1;
  }

  #appendBytes(bytes: _T.Bytes): void {
    this.#growIfNeeded(bytes.byteLength);
    this.#view.set(bytes, this.#index);
    this.#index += bytes.byteLength;
  }

  #growIfNeeded(increaseLength: _T.safeint): void {
    const needed = (this.#index + increaseLength) > this.#buffer.byteLength;

    if (this.#buffer.resizable !== true) {
      if (needed === true) {
        throw new RangeError("`ArrayBuffer` cannot be resized"); //TODO
      }
    }

    if (needed == true) {
      const newSize = this.#index + increaseLength;
      if (newSize > this.#buffer.maxByteLength) {
        throw new RangeError("Exceeds the resize limit for `ArrayBuffer`"); //TODO
      } else {
        this.#buffer.resize(newSize);
      }
    }
  }

  #assertNonDetached(): void {
    if (this.#buffer.detached === true) {
      throw new TypeError("`ArrayBuffer` is detached"); //TODO
    }
  }
}
