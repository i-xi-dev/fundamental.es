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

  loadUint8(byte: _T.safeint, options?: _LoadOptions_1): this {
    this.#assertAccessible();
    // byteの型はsaturateFrom/truncateFromでチェックされる

    const clamped = (options?.clampMode === _ClampMode.SATURATE)
      ? Uint8.saturateFrom(byte)
      : Uint8.truncateFrom(byte);

    if (this.#indexInRange(options?.insertAt)) {
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
    if (_T.isArrayBuffer(sourceBuffer) !== true) {
      throw Exception.TypeMismatch.arrayBuffer("Input");
    }

    if (this.#indexInRange(options?.insertAt)) {
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
    if (_T.isIterable(uint8s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    // let buffer: ArrayBuffer;
    // if (options?.clampMode === "saturate") {
    //   buffer = Uint8ClampedArray.from(uint8s).buffer;
    // }
    // buffer = Uint8Array.from(uint8s).buffer;
    // return this.loadArrayBuffer(buffer);

    const f = _uintClamper(Uint8, options?.clampMode);
    if (this.#indexInRange(options?.insertAt)) {
      for (const uint8 of uint8s) {
        throw new Error("TODO not-implemented");
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
    if (_T.isAsyncIterable(uint8s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    if (this.#indexInRange(options?.insertAt)) {
      for await (const uint8 of uint8s) {
        throw new Error("TODO not-implemented");
      }
    } else {
      for await (const uint8 of uint8s) {
        this.loadUint8(uint8, options);
      }
    }
    return this;
  }

  loadUint16Iterable(
    uint16s: Iterable<_T.safeint>,
    options?: _LoadOptions,
  ): this {
    this.#assertAccessible();
    if (_T.isIterable(uint16s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    const f = _uintClamper(Uint16, options?.clampMode);
    if (this.#indexInRange(options?.insertAt)) {
      for (const uint16 of uint16s) {
        throw new Error("TODO not-implemented");
      }
    } else {
      for (const uint16 of uint16s) {
        this.#appendBytes(Uint16.toBytes(f(uint16), options?.byteOrder));
      }
    }
    return this;
  }

  async loadUint16AsyncIterable(
    uint16s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertAccessible();
    if (_T.isAsyncIterable(uint16s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    const f = _uintClamper(Uint16, options?.clampMode);
    if (this.#indexInRange(options?.insertAt)) {
      for await (const uint16 of uint16s) {
        throw new Error("TODO not-implemented");
      }
    } else {
      for await (const uint16 of uint16s) {
        this.#appendBytes(Uint16.toBytes(f(uint16), options?.byteOrder));
      }
    }
    return this;
  }

  loadUint32Iterable(
    uint32s: Iterable<_T.safeint>,
    options?: _LoadOptions,
  ): this {
    this.#assertAccessible();
    if (_T.isIterable(uint32s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    const f = _uintClamper(Uint32, options?.clampMode);
    if (this.#indexInRange(options?.insertAt)) {
      for (const uint32 of uint32s) {
        throw new Error("TODO not-implemented");
      }
    } else {
      for (const uint32 of uint32s) {
        this.#appendBytes(Uint32.toBytes(f(uint32), options?.byteOrder));
      }
    }
    return this;
  }

  async loadUint32AsyncIterable(
    uint32s: AsyncIterable<_T.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertAccessible();
    if (_T.isAsyncIterable(uint32s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    const f = _uintClamper(Uint32, options?.clampMode);
    if (this.#indexInRange(options?.insertAt)) {
      for await (const uint32 of uint32s) {
        throw new Error("TODO not-implemented");
      }
    } else {
      for await (const uint32 of uint32s) {
        this.#appendBytes(Uint32.toBytes(f(uint32), options?.byteOrder));
      }
    }
    return this;
  }

  loadBigUint64Iterable(
    biguint64s: Iterable<bigint>,
    options?: _LoadOptions,
  ): this {
    this.#assertAccessible();
    if (_T.isIterable(biguint64s) !== true) {
      throw Exception.TypeMismatch.iterable("Input");
    }

    const f = _biguintClamper(BigUint64, options?.clampMode);
    if (this.#indexInRange(options?.insertAt)) {
      for (const biguint64 of biguint64s) {
        throw new Error("TODO not-implemented");
      }
    } else {
      for (const biguint64 of biguint64s) {
        this.#appendBytes(BigUint64.toBytes(f(biguint64), options?.byteOrder));
      }
    }
    return this;
  }

  async loadBigUint64AsyncIterable(
    biguint64s: AsyncIterable<bigint>,
    options?: _LoadOptions,
  ): Promise<this> {
    this.#assertAccessible();
    if (_T.isAsyncIterable(biguint64s) !== true) {
      throw Exception.TypeMismatch.asyncIterable("Input");
    }

    const f = _biguintClamper(BigUint64, options?.clampMode);
    if (this.#indexInRange(options?.insertAt)) {
      for await (const biguint64 of biguint64s) {
        throw new Error("TODO not-implemented");
      }
    } else {
      for await (const biguint64 of biguint64s) {
        this.#appendBytes(BigUint64.toBytes(f(biguint64), options?.byteOrder));
      }
    }
    return this;
  }

  //TODO
  // appendZeros(byteLength: _T.safeint): this {
  //   if (_T.isNonNegativeSafeInt(byteLength) !== true) {
  //     throw Exception.TypeMismatch.nonNegativeSafeInt("Input");
  //   }
  //
  //   return this.loadArrayBuffer(new ArrayBuffer(byteLength));
  // }

  //TODO
  // appendRandom(byteLength: _T.safeint): this {
  //   if (_T.isNonNegativeSafeInt(byteLength) !== true) {
  //     throw Exception.TypeMismatch.nonNegativeSafeInt("Input");
  //   }
  //
  //   return this.loadArrayBuffer(_randomBytes(byteLength));
  // }

  //TODO
  // WebSocketStream なんかは ReadableStream<ArrayBuffer>
  // TextEncoderStream なんかは ReadableStream<Uint8Array<ArrayBuffer>>
  // Uint8Arrayの場合はTranformStreamをかませば良い
  // async loadArrayBufferAsyncIterable(
  //   sourceBuffers: AsyncIterable<ArrayBuffer>,
  // ): Promise<this> {
  //   this.#assertAccessible();
  //   if (_T.isAsyncIterable(sourceBuffers) !== true) {
  //     throw Exception.TypeMismatch.asyncIterable("Input");
  //   }
  //
  //   for await (const sourceBuffer of sourceBuffers) {
  //     if (_T.isArrayBuffer(sourceBuffer) !== true) {
  //       throw Exception.TypeMismatch.arrayBuffer("Input");
  //     }
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

  //XXX fillZeros,fillRandom

  #indexInRange(index: unknown): index is _T.safeint {
    return _T.isNonNegativeSafeInt(index) && (index < this.#index);
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
    this.#growIfNeeded(offset + bytes.byteLength);
    this.#view.set(bytes, offset);
    this.#index = offset + bytes.byteLength;
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

  #assertAccessible(): void {
    if (this.#buffer.detached === true) {
      throw new TypeError("`ArrayBuffer` is detached"); //TODO
    }

    //TODO 非同期操作中もエラーにする
  }
}
