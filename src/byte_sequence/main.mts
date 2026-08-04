import { _Assert, _Type } from "../_common/mod.mts";
import {
  _bytesEquals,
  _bytesStartsWith,
  _Comparable,
  _randomBytes,
} from "./_utils.mts";
import {
  BigUint,
  BigUint64,
  isNonNegative,
  Uint,
  Uint16,
  Uint32,
  Uint8,
} from "../numerics/mod.mts";
import { ByteOrder } from "../byte_order.mts";

const _MAX_CAPACITY = 536_870_912;

const _DEFAULT_EXTENT = 1_048_576;

const _ClampMode = {
  TRUNCATE: "truncate",
  SATURATE: "saturate",
} as const;

type _ClampMode = typeof _ClampMode[keyof typeof _ClampMode];

function _uintClamper<T extends _Type.safeint>(
  x: Uint<T>,
  mode?: _ClampMode,
): (v: _Type.safeint) => T {
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
  insertAt?: _Type.safeint;
};

type _LoadOptions_2 = {
  insertAt?: _Type.safeint;
};

type _LoadOptions = {
  clampMode?: _ClampMode;
  byteOrder?: ByteOrder;
  insertAt?: _Type.safeint;
};

type _ToOptions = {
  byteLength?: _Type.safeint;
  //XXX fixLength?: boolean;
};

function _normalizeResizer(
  capacity: _Type.safeint,
  maxCapacity?: _Type.safeint,
): { resizable: boolean; maxByteLength?: _Type.safeint } {
  // capacityは型チェック済み前提

  if (_Type.isSafeInt(maxCapacity) && isNonNegative(maxCapacity)) {
    return {
      resizable: true,
      maxByteLength: (maxCapacity >= capacity) ? maxCapacity : capacity,
    };
  }

  return { resizable: false };
}

export class ByteSequence {
  readonly #buffer: ArrayBuffer;
  readonly #view: Uint8Array<ArrayBuffer>;
  #loadedCount: _Type.safeint; // 進むのみ。戻す手段は提供しない

  private constructor(capacity: _Type.safeint, maxCapacity?: _Type.safeint) {
    const { resizable, maxByteLength } = _normalizeResizer(
      capacity,
      maxCapacity,
    );
    if (resizable === true) {
      this.#buffer = new ArrayBuffer(capacity, { maxByteLength });
    } else {
      this.#buffer = new ArrayBuffer(capacity);
    }

    this.#view = new Uint8Array(this.#buffer);
    this.#loadedCount = 0;
  }

  get [Symbol.toStringTag](): string {
    return "ByteSequenceBuilder";
  }

  get detached(): boolean {
    return (this.#buffer.detached === true);
  }

  get capacity(): _Type.safeint {
    this.#assertAccessible();
    return this.#buffer.byteLength;
  }

  static create(
    capacity: _Type.safeint,
    maxCapacity?: _Type.safeint,
  ): ByteSequence {
    _Assert.nonNegativeSafeInt(capacity, "Capacity");
    if (_Type.isNullOrUndefined(maxCapacity) !== true) {
      _Assert.nonNegativeSafeInt(maxCapacity, "Max-capacity");
    }
    return new ByteSequence(capacity, maxCapacity);
  }

  loadUint8(byte: _Type.safeint, options?: _LoadOptions_1): this {
    this.#assertAccessible();
    // byteの型はsaturateFrom/truncateFromでチェックされる
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const clamped = (options?.clampMode === _ClampMode.SATURATE)
      ? Uint8.saturateFrom(byte)
      : Uint8.truncateFrom(byte);

    if (_Type.isSafeInt(options?.insertAt)) {
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
    _Assert.arrayBuffer(sourceBuffer, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    if (_Type.isSafeInt(options?.insertAt)) {
      this.#setBytes(new Uint8Array(sourceBuffer), options.insertAt);
    } else {
      this.#appendBytes(new Uint8Array(sourceBuffer));
    }
    return this;
  }

  loadUint8Iterable(
    uint8s: Iterable<_Type.safeint>,
    options?: _LoadOptions_1,
  ): this {
    this.#assertAccessible();
    _Assert.iterable(uint8s, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    // this.loadArrayBuffer(Uint8Array.from(uint8s).buffer);
    // これだと例えば["1"]は通ってしまう（Uint8Array.fromは"1"を1に暗黙変換するので）

    const f = _uintClamper(Uint8, options?.clampMode);
    if (_Type.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for (const uint8 of uint8s) {
        if (offset < this.#loadedCount) {
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
    uint8s: AsyncIterable<_Type.safeint>,
    options?: _LoadOptions_1,
  ): Promise<this> {
    this.#assertAccessible();
    _Assert.asyncIterable(uint8s, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _uintClamper(Uint8, options?.clampMode);
    if (_Type.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for await (const uint8 of uint8s) {
        if (offset < this.#loadedCount) {
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

  #loadUintNIterable<T extends _Type.safeint>(
    uT: Uint<T>,
    uintNs: Iterable<_Type.safeint>,
    options?: _LoadOptions,
  ): this {
    this.#assertAccessible();
    _Assert.iterable(uintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _uintClamper(uT, options?.clampMode);

    if (_Type.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for (const uintN of uintNs) {
        if (offset < this.#loadedCount) {
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
    _Assert.iterable(biguintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _biguintClamper(uT, options?.clampMode);

    if (_Type.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for (const biguintN of biguintNs) {
        if (offset < this.#loadedCount) {
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

  async #loadUintNAsyncIterable<T extends _Type.safeint>(
    uT: Uint<T>,
    uintNs: AsyncIterable<_Type.safeint>,
    options?: _LoadOptions,
  ) {
    this.#assertAccessible();
    _Assert.asyncIterable(uintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _uintClamper(uT, options?.clampMode);

    if (_Type.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for await (const uintN of uintNs) {
        if (offset < this.#loadedCount) {
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
    _Assert.asyncIterable(biguintNs, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    const f = _biguintClamper(uT, options?.clampMode);

    if (_Type.isSafeInt(options?.insertAt)) {
      let offset = options.insertAt;
      for await (const biguintN of biguintNs) {
        if (offset < this.#loadedCount) {
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
    uint16s: Iterable<_Type.safeint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadUintNIterable(Uint16, uint16s, options);
  }

  loadUint16AsyncIterable(
    uint16s: AsyncIterable<_Type.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    return this.#loadUintNAsyncIterable(Uint16, uint16s, options);
  }

  loadUint32Iterable(
    uint32s: Iterable<_Type.safeint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadUintNIterable(Uint32, uint32s, options);
  }

  loadUint32AsyncIterable(
    uint32s: AsyncIterable<_Type.safeint>,
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

  fillZeros(byteLength: _Type.safeint, options?: _LoadOptions_2): this {
    this.#assertAccessible();
    _Assert.nonNegativeSafeInt(byteLength, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    return this.loadArrayBuffer(new ArrayBuffer(byteLength), options);
  }

  fillRandom(byteLength: _Type.safeint, options?: _LoadOptions_2): this {
    this.#assertAccessible();
    _Assert.nonNegativeSafeInt(byteLength, "Input");
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
  //   _Assert.asyncIterable(sourceBuffers, "Input");
  //
  //   for await (const sourceBuffer of sourceBuffers) {
  //     _Assert.arrayBuffer(sourceBuffer);
  //     this.#appendBytes(new Uint8Array(sourceBuffer));
  //   }
  //   return this;
  // }

  #getSublength(options?: _ToOptions): _Type.safeint {
    if (
      _Type.isSafeInt(options?.byteLength) && isNonNegative(options.byteLength)
    ) {
      return Math.min(options.byteLength, this.#loadedCount);
    }
    return this.#loadedCount;
  }

  toArrayBuffer(options?: _ToOptions): ArrayBuffer {
    this.#assertAccessible();
    return this.#buffer.slice(0, this.#getSublength(options));
  }

  toBytes(options?: _ToOptions): _Type.Bytes {
    // this.#assertAccessible(); toArrayBufferで実施
    return new Uint8Array(this.toArrayBuffer(options));
  }

  //XXX toUint8Iterable, toArray, ...

  toArrayBufferWithDetach(options?: _ToOptions): ArrayBuffer {
    this.#assertAccessible();
    // const buffer = (options?.fixLength === true)
    //   ? this.#bytes.buffer.transferToFixedLength(options?.byteLength)
    //   : this.#bytes.buffer.transfer(options?.byteLength);
    // return buffer; //XXX-$105 v8のバグ resizableなArrayBufferのUint8ArrayでのtoHex()に失敗
    const length = (_Type.isSafeInt(options?.byteLength) &&
        isNonNegative(options.byteLength))
      ? options.byteLength
      : this.#loadedCount; //TODO options.byteLengthがloadedCountより大きい場合
    return this.#buffer.transferToFixedLength(length);
  }

  toBytesWithDetach(options?: _ToOptions): _Type.Bytes {
    return new Uint8Array(this.toArrayBufferWithDetach(options));
  }

  // 書き換え可能状態なので注意
  #loadedBytes(): _Type.Bytes {
    return this.#view.subarray(0, this.#loadedCount);
  }

  toArray(options?: _ToOptions): Array<_Type.uint8> { //TODO options
    return Array.from(this.#loadedBytes()) as Array<_Type.uint8>;
  }

  #assertOffsetInRangeOrNull(
    test: unknown,
  ): asserts test is _Type.safeint | null | undefined {
    if (_Type.isNullOrUndefined(test) === true) {
      // null | undefined はok
      return;
    }

    if (
      _Type.isSafeInt(test) && isNonNegative(test) && (test < this.#loadedCount)
    ) {
      // 整数かつ #loadedCount 未満はok
      return;
    }

    throw new RangeError("Insertion position is out of range"); // number型ですらないかもしれないが、そこまでは知らん
  }

  #appendByte(byte: _Type.uint8): void {
    this.#growIfNeeded(1);
    this.#view[this.#loadedCount] = byte;
    this.#loadedCount += 1;
  }

  #appendBytes(bytes: _Type.Bytes): void {
    this.#growIfNeeded(bytes.byteLength);
    this.#view.set(bytes, this.#loadedCount);
    this.#loadedCount += bytes.byteLength;
  }

  #setBytes(bytes: _Type.Bytes, offset: _Type.safeint): void {
    const setEnd = offset + bytes.byteLength;
    this.#growIfNeeded(setEnd);
    this.#view.set(bytes, offset);
    if (setEnd > this.#loadedCount) {
      this.#loadedCount = setEnd;
    }
  }

  #growIfNeeded(increaseLength: _Type.safeint): void {
    const needed =
      (this.#loadedCount + increaseLength) > this.#buffer.byteLength;

    if (this.#buffer.resizable !== true) {
      if (needed === true) {
        throw new RangeError("`ArrayBuffer` cannot be resized");
      }
    }

    if (needed == true) {
      const minSize = this.#loadedCount + increaseLength;
      const optSize = this.#loadedCount + _DEFAULT_EXTENT; //XXX 適切なサイズは？

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

    //TODO 非同期操作中もエラーにする
  }

  startsWith(other: ByteSequence | _Comparable): boolean {
    this.#assertAccessible();

    if (other instanceof ByteSequence) {
      return _bytesStartsWith(this.#loadedBytes(), other.#loadedBytes());
    } else {
      return _bytesStartsWith(this.#loadedBytes(), other);
    }
  }

  equals(other: ByteSequence | _Comparable): boolean {
    this.#assertAccessible();

    if (other instanceof ByteSequence) {
      return _bytesEquals(this.#loadedBytes(), other.#loadedBytes());
    } else {
      return _bytesEquals(this.#loadedBytes(), other);
    }
  }
}

// export namespace ByteSequence {
//   export function fromArrayBuffer() {
//   }
// }
