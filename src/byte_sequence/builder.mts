import { _T } from "../_common/mod.mts";
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

const _DEFAULT_EXTENT = 1_048_576;

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

type _LoadOptions_1 = {
  clampMode?: _ClampMode;
  insertAt?: _T.safeint;
};

type _LoadOptions_2 = {
  insertAt?: _T.safeint;
};

type _LoadOptions = {
  clampMode?: _ClampMode;
  byteOrder?: ByteOrder;
  insertAt?: _T.safeint;
};

type _ToBufferOptions = {
  byteLength?: _T.safeint;
  //XXX fixLength?: boolean;
};

function _randomBytes(byteLength: _T.safeint): ArrayBuffer {
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

export class Builder {
  readonly #buffer: ArrayBuffer;
  readonly #view: Uint8Array<ArrayBuffer>;
  #index: _T.safeint; // 進むのみ。戻す手段は提供しない

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
    this.#assertAccessible();
    return this.#buffer.byteLength;
  }

  static create(
    capacity: _T.safeint,
    maxCapacity?: _T.safeint,
  ): Builder {
    _T.assertNonNegativeSafeInt(capacity, "Capacity");
    if (_T.isNullOrUndefined(maxCapacity) !== true) {
      _T.assertNonNegativeSafeInt(maxCapacity, "Max-capacity");
    }
    return new Builder(capacity, maxCapacity);
  }

  loadUint8(byte: _T.safeint, options?: _LoadOptions_1): this {
    this.#assertAccessible();
    // byteの型はsaturateFrom/truncateFromでチェックされる
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const clamped = (options?.clampMode === _ClampMode.SATURATE)
      ? Uint8.saturateFrom(byte)
      : Uint8.truncateFrom(byte);

    if (_T.isSafeInt(options?.insertAt)) {
      this.#view[options.insertAt] = clamped;
    } else {
      this.#appendByte(clamped);
    }
    return this;
  }

  // - sourceBufferの部分範囲だけ追加したければ切り出してから渡せば良い
  // - SharedArrayBufferは弾く
  // - sourceBufferは読み取るだけなのでdetatch等しない（要らないなら自分で処分すること）
  loadArrayBuffer(sourceBuffer: ArrayBuffer, options?: _LoadOptions_2): this {
    this.#assertAccessible();
    _T.assertArrayBuffer(sourceBuffer, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    if (_T.isSafeInt(options?.insertAt)) {
      this.#setBytes(new Uint8Array(sourceBuffer), options.insertAt);
    } else {
      this.#appendBytes(new Uint8Array(sourceBuffer));
    }
    return this;
  }

  loadUint8Iterable(
    uint8s: Iterable<_T.safeint>,
    options?: _LoadOptions_1,
  ): this {
    this.#assertAccessible();
    _T.assertIterable(uint8s, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    // this.loadArrayBuffer(Uint8Array.from(uint8s).buffer);
    // これだと例えば["1"]は通ってしまう（Uint8Array.fromは"1"を1に暗黙変換するので）

    const f = _uintClamper(Uint8, options?.clampMode);
    if (_T.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for (const uint8 of uint8s) {
        if (offset < this.#index) {
          this.#view[offset] = f(uint8);
        } else {
          this.#appendByte(f(uint8));
        }
        offset += Uint8.BYTE_LENGTH;
      }
    } else {
      for (const uint8 of uint8s) {
        this.#appendByte(f(uint8));
      }
    }
    return this;
  }

  async loadUint8AsyncIterable(
    uint8s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions_1,
  ): Promise<this> {
    this.#assertAccessible();
    _T.assertAsyncIterable(uint8s, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _uintClamper(Uint8, options?.clampMode);
    if (_T.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for await (const uint8 of uint8s) {
        if (offset < this.#index) {
          this.#view[offset] = f(uint8);
        } else {
          this.#appendByte(f(uint8));
        }
        offset += Uint8.BYTE_LENGTH;
      }
    } else {
      for await (const uint8 of uint8s) {
        this.#appendByte(f(uint8));
      }
    }
    return this;
  }

  #loadUintNIterable<T extends _T.safeint>(
    uT: Uint<T>,
    uintNs: Iterable<_T.safeint>,
    options?: _LoadOptions,
  ): this {
    this.#assertAccessible();
    _T.assertIterable(uintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _uintClamper(uT, options?.clampMode);

    if (_T.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for (const uintN of uintNs) {
        if (offset < this.#index) {
          this.#setBytes(uT.toBytes(f(uintN), options?.byteOrder), offset);
        } else {
          this.#appendBytes(uT.toBytes(f(uintN), options?.byteOrder));
        }
        offset += uT.BYTE_LENGTH;
      }
    } else {
      for (const uintN of uintNs) {
        this.#appendBytes(uT.toBytes(f(uintN), options?.byteOrder));
      }
    }
    return this;
  }

  #loadBigUintNIterable<T extends bigint>(
    uT: BigUint<T>,
    biguintNs: Iterable<bigint>,
    options?: _LoadOptions,
  ): this {
    this.#assertAccessible();
    _T.assertIterable(biguintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _biguintClamper(uT, options?.clampMode);

    if (_T.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for (const biguintN of biguintNs) {
        if (offset < this.#index) {
          this.#setBytes(uT.toBytes(f(biguintN), options?.byteOrder), offset);
        } else {
          this.#appendBytes(uT.toBytes(f(biguintN), options?.byteOrder));
        }
        offset += uT.BYTE_LENGTH;
      }
    } else {
      for (const biguintN of biguintNs) {
        this.#appendBytes(uT.toBytes(f(biguintN), options?.byteOrder));
      }
    }
    return this;
  }

  async #loadUintNAsyncIterable<T extends _T.safeint>(
    uT: Uint<T>,
    uintNs: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ) {
    this.#assertAccessible();
    _T.assertAsyncIterable(uintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _uintClamper(uT, options?.clampMode);

    if (_T.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for await (const uintN of uintNs) {
        if (offset < this.#index) {
          this.#setBytes(uT.toBytes(f(uintN), options?.byteOrder), offset);
        } else {
          this.#appendBytes(uT.toBytes(f(uintN), options?.byteOrder));
        }
        offset += uT.BYTE_LENGTH;
      }
    } else {
      for await (const uintN of uintNs) {
        this.#appendBytes(uT.toBytes(f(uintN), options?.byteOrder));
      }
    }
    return this;
  }

  async #loadBigUintNAsyncIterable<T extends bigint>(
    uT: BigUint<T>,
    biguintNs: AsyncIterable<bigint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertAccessible();
    _T.assertAsyncIterable(biguintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _biguintClamper(uT, options?.clampMode);

    if (_T.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for await (const biguintN of biguintNs) {
        if (offset < this.#index) {
          this.#setBytes(uT.toBytes(f(biguintN), options?.byteOrder), offset);
        } else {
          this.#appendBytes(uT.toBytes(f(biguintN), options?.byteOrder));
        }
        offset += uT.BYTE_LENGTH;
      }
    } else {
      for await (const biguintN of biguintNs) {
        this.#appendBytes(uT.toBytes(f(biguintN), options?.byteOrder));
      }
    }
    return this;
  }

  loadUint16Iterable(
    uint16s: Iterable<_T.safeint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadUintNIterable(Uint16, uint16s, options);
  }

  loadUint16AsyncIterable(
    uint16s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    return this.#loadUintNAsyncIterable(Uint16, uint16s, options);
  }

  loadUint32Iterable(
    uint32s: Iterable<_T.safeint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadUintNIterable(Uint32, uint32s, options);
  }

  loadUint32AsyncIterable(
    uint32s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    return this.#loadUintNAsyncIterable(Uint32, uint32s, options);
  }

  loadBigUint64Iterable(
    biguint64s: Iterable<bigint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadBigUintNIterable(BigUint64, biguint64s, options);
  }

  loadBigUint64AsyncIterable(
    biguint64s: AsyncIterable<bigint>,
    options?: _LoadOptions,
  ): Promise<this> {
    return this.#loadBigUintNAsyncIterable(BigUint64, biguint64s, options);
  }

  fillZeros(byteLength: _T.safeint, options?: _LoadOptions_2): this {
    this.#assertAccessible();
    _T.assertNonNegativeSafeInt(byteLength, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    return this.loadArrayBuffer(new ArrayBuffer(byteLength), options);
  }

  fillRandom(byteLength: _T.safeint, options?: _LoadOptions_2): this {
    this.#assertAccessible();
    _T.assertNonNegativeSafeInt(byteLength, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    return this.loadArrayBuffer(_randomBytes(byteLength), options);
  }

  //TODO
  // WebSocketStream なんかは ReadableStream<ArrayBuffer>
  // TextEncoderStream なんかは ReadableStream<Uint8Array<ArrayBuffer>>
  // Uint8Arrayの場合はTranformStreamをかませば良い
  // async loadArrayBufferAsyncIterable(
  //   sourceBuffers: AsyncIterable<ArrayBuffer>, options?
  // ): Promise<this> {
  //   this.#assertAccessible();
  //   _T.assertAsyncIterable(sourceBuffers, "Input");
  //
  //   for await (const sourceBuffer of sourceBuffers) {
  //     _T.assertArrayBuffer(sourceBuffer);
  //     this.#appendBytes(new Uint8Array(sourceBuffer));
  //   }
  //   return this;
  // }

  toArrayBuffer(options?: _ToBufferOptions): ArrayBuffer {
    this.#assertAccessible();
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

  #assertOffsetInRangeOrNull(
    test: unknown,
  ): asserts test is _T.safeint | null | undefined {
    if (_T.isNullOrUndefined(test) === true) {
      // null | undefined はok
      return;
    }

    if (_T.isNonNegativeSafeInt(test) && (test < this.#index)) {
      // 整数かつ #index 未満はok
      return;
    }

    throw new RangeError("Insertion position is out of range"); // number型ですらないかもしれないが、そこまでは知らん
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

  #setBytes(bytes: _T.Bytes, offset: _T.safeint): void {
    const setEnd = offset + bytes.byteLength;
    this.#growIfNeeded(setEnd);
    this.#view.set(bytes, offset);
    if (setEnd > this.#index) {
      this.#index = setEnd;
    }
  }

  #growIfNeeded(increaseLength: _T.safeint): void {
    const needed = (this.#index + increaseLength) > this.#buffer.byteLength;

    if (this.#buffer.resizable !== true) {
      if (needed === true) {
        throw new RangeError("`ArrayBuffer` cannot be resized");
      }
    }

    if (needed == true) {
      const minSize = this.#index + increaseLength;
      const optSize = this.#index + _DEFAULT_EXTENT; //XXX 適切なサイズは？

      if (minSize > this.#buffer.maxByteLength) {
        throw new RangeError("Exceeds the resize limit for `ArrayBuffer`");
      } else if (optSize > this.#buffer.maxByteLength) {
        this.#buffer.resize(minSize);
      } else {
        this.#buffer.resize(optSize);
      }
    }
  }

  #assertAccessible(): void {
    if (this.#buffer.detached === true) {
      throw new TypeError("`ArrayBuffer` is detached");
    }

    //TODO 非同期操作中もエラーにする、もしくは、非同期はstaticメソッドのみにする
  }
}
