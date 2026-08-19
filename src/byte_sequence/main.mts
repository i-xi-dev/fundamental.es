import { _Assert, _Error, _Type } from "../_common/mod.mts";
import {
  _bytesEquals,
  _bytesStartsWith,
  _Comparable,
  _randomBytes,
} from "./_utils.mts";
import { Base64, BinaryString, Percent } from "../bytes_encoding/mod.mts";
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
import { Md5 } from "../bytes_digest/mod.mts";
import { Utf8 } from "../text_encoding/mod.mts";

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

  private constructor(buffer: ArrayBuffer, initialCount: _Type.safeint) {
    this.#buffer = buffer;
    this.#view = new Uint8Array(this.#buffer);
    this.#loadedCount = initialCount;
  }

  get [Symbol.toStringTag](): string {
    return "ByteSequence";
  }

  get capacity(): _Type.safeint {
    this.#assertAccessible();
    return this.#buffer.byteLength;
  }

  get maxCapacity(): _Type.safeint {
    this.#assertAccessible();
    return this.#buffer.maxByteLength;
  }

  get count(): _Type.safeint {
    this.#assertAccessible();
    return this.#loadedCount;
  }

  get resizable(): boolean {
    this.#assertAccessible();
    return this.#buffer.resizable;
  }

  get detached(): boolean {
    return (this.#buffer.detached === true);
  }

  static create(
    capacity: _Type.safeint,
    maxCapacity?: _Type.safeint,
  ): ByteSequence {
    _Assert.nonNegativeSafeInt(capacity, "Capacity");
    if (_Type.isNullOrUndefined(maxCapacity) !== true) {
      _Assert.nonNegativeSafeInt(maxCapacity, "Max-capacity");
    }

    const { resizable, maxByteLength } = _normalizeResizer(
      capacity,
      maxCapacity,
    );
    const buffer = (resizable === true)
      ? new ArrayBuffer(capacity, { maxByteLength })
      : new ArrayBuffer(capacity);

    return new ByteSequence(buffer, 0);
  }

  static #wrap(buffer: ArrayBuffer): ByteSequence {
    return new ByteSequence(buffer, buffer.byteLength);
  }

  setByte(byte: _Type.safeint, options?: _LoadOptions_1): this {
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
  loadFromArrayBuffer(
    sourceBuffer: ArrayBuffer,
    options?: _LoadOptions_2,
  ): this {
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

  loadFromUint8Iterable(
    uint8s: Iterable<_Type.safeint>,
    options?: _LoadOptions_1,
  ): this {
    this.#assertAccessible();
    _Assert.iterable(uint8s, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    // this.loadFromArrayBuffer(Uint8Array.from(uint8s).buffer);
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

  //XXX loadFromBytes(bytes: _Type.Bytes, options?: _LoadOptions_1): this {
  //   return this.loadFromUint8Iterable(bytes, options);
  // }

  async loadFromUint8AsyncIterable(
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

  #loadFromUintNIterable<T extends _Type.safeint>(
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

  #loadFromBigUintNIterable<T extends bigint>(
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

  async #loadFromUintNAsyncIterable<T extends _Type.safeint>(
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

  async #loadFromBigUintNAsyncIterable<T extends bigint>(
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

  loadFromUint16Iterable(
    uint16s: Iterable<_Type.safeint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadFromUintNIterable(Uint16, uint16s, options);
  }

  loadFromUint16AsyncIterable(
    uint16s: AsyncIterable<_Type.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    return this.#loadFromUintNAsyncIterable(Uint16, uint16s, options);
  }

  loadFromUint32Iterable(
    uint32s: Iterable<_Type.safeint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadFromUintNIterable(Uint32, uint32s, options);
  }

  loadFromUint32AsyncIterable(
    uint32s: AsyncIterable<_Type.safeint>,
    options?: _LoadOptions,
  ): Promise<this> {
    return this.#loadFromUintNAsyncIterable(Uint32, uint32s, options);
  }

  loadFromBigUint64Iterable(
    biguint64s: Iterable<bigint>,
    options?: _LoadOptions,
  ): this {
    return this.#loadFromBigUintNIterable(BigUint64, biguint64s, options);
  }

  loadFromBigUint64AsyncIterable(
    biguint64s: AsyncIterable<bigint>,
    options?: _LoadOptions,
  ): Promise<this> {
    return this.#loadFromBigUintNAsyncIterable(BigUint64, biguint64s, options);
  }

  fillZeros(byteLength: _Type.safeint, options?: _LoadOptions_2): this {
    this.#assertAccessible();
    _Assert.nonNegativeSafeInt(byteLength, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    return this.loadFromArrayBuffer(new ArrayBuffer(byteLength), options);
  }

  fillRandom(byteLength: _Type.safeint, options?: _LoadOptions_2): this {
    this.#assertAccessible();
    _Assert.nonNegativeSafeInt(byteLength, "Input");
    this.#assertOffsetInRangeOrNull(options?.insertAt);

    return this.loadFromArrayBuffer(_randomBytes(byteLength), options);
  }

  // loadFromBase64Encoded()
  // loadFromBinaryString()
  // loadFromHexEncoded()
  // loadFromPercentEncoded()
  // → Encoderの結果を loadFromArrayBuffer() すれば良いので一旦不要

  toArrayBuffer(): ArrayBuffer {
    this.#assertAccessible();
    return this.#buffer.slice(0, this.#loadedCount);
  }

  toBytes(): _Type.Bytes {
    // this.#assertAccessible(); toArrayBufferで実施
    return new Uint8Array(this.toArrayBuffer());
  }

  toArray(): Array<_Type.uint8> {
    // this.#assertAccessible(); toArrayBufferで実施
    return Array.from(this.toBytes()) as Array<_Type.uint8>;
  }

  toBase64Encoded(options?: Base64.EncoderOptions): string {
    this.#assertAccessible();
    return this.#loadedBytes().toBase64(options);
  }

  toBinaryString(): string {
    this.#assertAccessible();
    return BinaryString.encode(this.#loadedBytes());
  }

  toHexEncoded(): string {
    this.#assertAccessible();
    return this.#loadedBytes().toHex();
  }

  toPercentEncoded(options?: Percent.EncoderOptions): string {
    this.#assertAccessible();
    return Percent.encode(this.#loadedBytes(), options);
  }

  /** @deprecated */
  async toMd5Digest(): Promise<ByteSequence> {
    this.#assertAccessible();
    const bytes = await Md5.compute(this.#loadedBytes());
    return ByteSequence.#wrap(bytes.buffer);
  }

  /** @deprecated */
  async toSha1Digest(): Promise<ByteSequence> {
    this.#assertAccessible();
    const buffer = await globalThis.crypto.subtle.digest(
      "SHA-1",
      this.#loadedBytes(),
    );
    return ByteSequence.#wrap(buffer);
  }

  async toSha256Digest(): Promise<ByteSequence> {
    this.#assertAccessible();
    const buffer = await globalThis.crypto.subtle.digest(
      "SHA-256",
      this.#loadedBytes(),
    );
    return ByteSequence.#wrap(buffer);
  }

  async toSha384Digest(): Promise<ByteSequence> {
    this.#assertAccessible();
    const buffer = await globalThis.crypto.subtle.digest(
      "SHA-384",
      this.#loadedBytes(),
    );
    return ByteSequence.#wrap(buffer);
  }

  async toSha512Digest(): Promise<ByteSequence> {
    this.#assertAccessible();
    const buffer = await globalThis.crypto.subtle.digest(
      "SHA-512",
      this.#loadedBytes(),
    );
    return ByteSequence.#wrap(buffer);
  }

  //XXX toUint16Iterable(byteOrder?: ByteOrder): Iterable<number>
  //XXX toUint32Iterable(byteOrder?: ByteOrder): Iterable<number>
  //XXX toBigUint64Iterable(byteOrder?: ByteOrder): Iterable<number>

  startsWith(other: ByteSequence | _Comparable): boolean {
    this.#assertAccessible();

    if (other instanceof ByteSequence) {
      return _bytesStartsWith(this.#loadedBytes(), other.#loadedBytes());
    } else {
      return _bytesStartsWith(this.#loadedBytes(), other);
    }
  }

  //XXX bytesEquals の方が良いか？
  equals(other: ByteSequence | _Comparable): boolean {
    this.#assertAccessible();

    if (other instanceof ByteSequence) {
      return _bytesEquals(this.#loadedBytes(), other.#loadedBytes());
    } else {
      return _bytesEquals(this.#loadedBytes(), other);
    }
  }

  cloneSubsequence(start?: _Type.safeint, end?: _Type.safeint): ByteSequence {
    this.#assertAccessible();

    if ((_Type.isNullOrUndefined(start) || _Type.isSafeInt(start)) !== true) {
      throw _Error.Type.mustBeSafeInt("Start index");
    }
    if ((_Type.isNullOrUndefined(end) || _Type.isSafeInt(end)) !== true) {
      throw _Error.Type.mustBeSafeInt("End index");
    }

    const adjStart = start ?? 0;
    const adjEnd = end ?? this.#loadedCount;

    if (adjStart < 0) {
      throw _Error.Range.underflow(0, "Start index");
    }
    if (adjEnd < 0) {
      throw _Error.Range.underflow(0, "End index");
    }

    if (adjStart > this.#loadedCount) {
      throw _Error.Range.overflow(this.#loadedCount, "Start index");
    }
    if (adjEnd > this.#loadedCount) {
      throw _Error.Range.overflow(this.#loadedCount, "End index");
    }

    if (adjStart > adjEnd) {
      throw _Error.Range.contradictory();
    }

    const buffer = this.#buffer.slice(start, end); //XXX sliceの結果はresizable:falseになる
    return ByteSequence.#wrap(buffer);
  }

  byteAt(index: _Type.safeint): _Type.uint8 {
    this.#assertAccessible();

    _Assert.safeInt(index, "Input");
    if (index < 0) {
      throw _Error.Range.underflow(0, "Input");
    }
    if (index >= this.#loadedCount) {
      throw _Error.Range.overflow(this.#loadedCount, "Input");
    }

    return this.#view[index] as _Type.uint8;
  }

  [Symbol.iterator](): IterableIterator</* _Type.uint8 */ number> {
    // this.#assertAccessible(); toBytesで実施
    return this.toBytes()[Symbol.iterator]();
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

  //XXX toUint8Iterable, , ...

  //TODO test
  toArrayBufferWithDetach(options?: _ToOptions): ArrayBuffer {
    this.#assertAccessible();
    // const buffer = (options?.fixLength === true)
    //   ? this.#bytes.buffer.transferToFixedLength(options?.byteLength)
    //   : this.#bytes.buffer.transfer(options?.byteLength);
    // return buffer; //XXX-$105 v8のバグ resizableなArrayBufferのUint8ArrayでのtoHex()に失敗
    const length = (_Type.isSafeInt(options?.byteLength) &&
        isNonNegative(options.byteLength))
      ? Math.min(options.byteLength, this.#loadedCount)
      : this.#loadedCount; //TODO options.byteLengthがloadedCountより大きい場合
    return this.#buffer.transferToFixedLength(length);
  }

  //TODO test
  toBytesWithDetach(options?: _ToOptions): _Type.Bytes {
    return new Uint8Array(this.toArrayBufferWithDetach(options));
  }

  // 書き換え可能状態なので注意
  #loadedBytes(): _Type.Bytes {
    return this.#view.subarray(0, this.#loadedCount);
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
}

type _FromOptions = {
  maxCapacity?: _Type.safeint;
};

type _FromOptions_1 = {
  maxCapacity?: _Type.safeint;
  clampMode?: _ClampMode;
};

function _create(
  capacity: _Type.safeint,
  options?: _FromOptions,
): ByteSequence {
  return (_Type.isSafeInt(options?.maxCapacity) &&
      isNonNegative(options.maxCapacity))
    ? ByteSequence.create(capacity, Math.max(capacity, options.maxCapacity))
    : ByteSequence.create(capacity);
}

export namespace ByteSequence {
  export function zeros(
    byteLength: _Type.safeint,
    options?: _FromOptions,
  ) {
    _Assert.nonNegativeSafeInt(byteLength, "Input");
    return _create(byteLength, options).fillZeros(byteLength);
  }

  export function random(
    byteLength: _Type.safeint,
    options?: _FromOptions,
  ) {
    _Assert.nonNegativeSafeInt(byteLength, "Input");
    return _create(byteLength, options).fillRandom(byteLength);
  }

  export function fromArrayBuffer(
    src: ArrayBuffer,
    options?: _FromOptions,
  ): ByteSequence {
    _Assert.arrayBuffer(src, "Input");
    return _create(src.byteLength, options).loadFromArrayBuffer(src);
  }

  //XXX lengthが不明の場合どうする
  // export function fromUint8Iterable(
  //   uint8s: Iterable<_Type.safeint>,
  //   options?: _FromOptions_1,
  // ) {
  // }

  export function fromBytes(
    src: _Type.Bytes,
    options?: _FromOptions,
  ): ByteSequence {
    _Assert.nonSharedUint8Array(src, "Input");
    return fromArrayBuffer(src.buffer, options);
  }

  export function fromArray(
    src: Array</* _Type.uint8 */ _Type.safeint>,
    options?: _FromOptions,
  ): ByteSequence {
    _Assert.safeIntArray(src, "Input");
    return _create(src.length, options).loadFromUint8Iterable(src);
  }

  //XXX fromUint8AsyncIterable() length不明なので見積を指定させる

  export function fromBase64Encoded(
    base64: string,
    options?: Base64.DecoderOptions & _FromOptions,
  ): ByteSequence {
    _Assert.string(base64, "Input");

    const bytes = Uint8Array.fromBase64(base64, options);
    return fromBytes(bytes, options);
  }

  export function fromBinaryString(
    binstr: string,
    options?: _FromOptions,
  ): ByteSequence {
    _Assert.string(binstr, "Input");

    const bytes = BinaryString.decode(binstr);
    return fromBytes(bytes, options);
  }

  export function fromHexEncoded(
    hex: string,
    options?: _FromOptions,
  ): ByteSequence {
    _Assert.string(hex, "Input");

    const bytes = Uint8Array.fromHex(hex);
    return fromBytes(bytes, options);
  }

  export function fromPercentEncoded(
    percent: string,
    options?: Percent.DecoderOptions & _FromOptions,
  ): ByteSequence {
    _Assert.string(percent, "Input");

    const bytes = Percent.decode(percent, options);
    return fromBytes(bytes, options);
  }

  // UTF-8
  export function fromText(
    text: string,
    options?: Utf8.EncoderOptions & _FromOptions,
  ): ByteSequence {
    _Assert.string(text, "Input");

    const bytes = Utf8.encode(text, options);
    return fromBytes(bytes, options);
  }

  //XXX fromStream()
}
