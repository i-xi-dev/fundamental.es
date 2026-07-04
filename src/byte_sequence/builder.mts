import { _T } from "../_common/mod.mts";
import { Exception } from "../_internal/mod.mts";
import { ByteOrder } from "../byte_order.mts";
import { Uint16, Uint32, Uint8 } from "../numerics/mod.mts";

const _MAX_CAPACITY = 536_870_912;

const _DEFAULT_EXTENT = 1_048_576;

const _ClampMode = {
  TRUNCATE: "truncate",
  SATURATE: "saturate",
} as const;

type _ClampMode = typeof _ClampMode[keyof typeof _ClampMode];

function _getUint16Clamper(mode?: _ClampMode): (v: _T.safeint) => _T.uint16 {
  return (mode === _ClampMode.SATURATE)
    ? (v) => Uint16.saturateFrom(v)
    : (v) => Uint16.truncateFrom(v);
}

function _getUint32Clamper(mode?: _ClampMode): (v: _T.safeint) => _T.uint32 {
  return (mode === _ClampMode.SATURATE)
    ? (v) => Uint32.saturateFrom(v)
    : (v) => Uint32.truncateFrom(v);
}

type _LoadOptions = {
  clampMode?: _ClampMode;
  byteOrder?: ByteOrder;
};

function _uint8sToBuffer(
  uint8s: Iterable<_T.safeint>,
  options?: _LoadOptions,
): ArrayBuffer {
  if (options?.clampMode === "saturate") {
    return Uint8ClampedArray.from(uint8s).buffer;
  }
  return Uint8Array.from(uint8s).buffer;
}

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
    //TODO 要素の型は逐次チェックするしかない
    // _uint8sToBuffer ではUint8Arry.fromを第2引数なしで使っているので、["0"]とか渡されたとしても暗黙に型変換される

    const buffer = _uint8sToBuffer(uint8s, options);
    return this.loadFromArrayBuffer(buffer);
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

    const f = _getUint16Clamper(options?.clampMode);
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

    const f = _getUint16Clamper(options?.clampMode);
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

    const f = _getUint32Clamper(options?.clampMode);
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

    const f = _getUint32Clamper(options?.clampMode);
    for await (const uint32 of uint32s) {
      this.#appendBytes(Uint32.toBytes(f(uint32), options?.byteOrder));
    }
    return this;
  }

  toArrayBuffer(
    options?: { byteLength?: _T.safeint /* fixLength?: boolean */ },
  ): ArrayBuffer {
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
