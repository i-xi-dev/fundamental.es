//

// The byte encoding

// TODO namespace

/**
 * The decoder that converts a string into a byte sequence.
 */
interface ByteDecoder {
  /**
   * Converts a string into a byte sequence.
   * 
   * @param encoded An encoded string to decode.
   * @returns A decoded byte sequence.
   */
  decode(encoded: string): Uint8Array;
}

/**
 * The encoder that converts a byte sequence into a string.
 */
interface ByteEncoder {
  /**
   * Converts a byte sequence into a string.
   * 
   * @param toEncode A byte sequence to encode.
   * @returns An encoded string.
   */
  encode(toEncode: Uint8Array): string;
}

interface ByteDecoderStreamRegulator {
  regulate(chunk: string): string;
  flush(): string;
}

abstract class ByteDecoderStream implements TransformStream<string, Uint8Array> {
  readonly #stream: TransformStream<string, Uint8Array>;

  constructor(decoder: ByteDecoder, regulator: ByteDecoderStreamRegulator) {
    this.#stream = new TransformStream<string, Uint8Array>(ByteDecoderStream._createTransformer(decoder, regulator));
  }

  protected static _createTransformer(decoder: ByteDecoder, regulator: ByteDecoderStreamRegulator): Transformer<string, Uint8Array> {
    return {
      transform(chunk: string, controller: TransformStreamDefaultController<Uint8Array>): void {
        const toDecode = regulator.regulate(chunk);
        const decoded = decoder.decode(toDecode);
        controller.enqueue(decoded);
      },
      flush(controller: TransformStreamDefaultController<Uint8Array>): void {
        const toDecode = regulator.flush();
        if (toDecode.length > 0) {
          const decoded = decoder.decode(toDecode);
          controller.enqueue(decoded);
        }
      },
    };
  }

  /**
   * @see [TransformStream.writable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/writable)
   */
  get writable(): WritableStream<string> {
    return this.#stream.writable;
  }

  /**
   * @see [TransformStream.readable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/readable)
   */
  get readable(): ReadableStream<Uint8Array> {
    return this.#stream.readable;
  }
}
Object.freeze(ByteDecoderStream);

interface ByteEncoderStreamRegulator {
  regulate(chunk: Uint8Array): Uint8Array;
  flush(): Uint8Array;
}

abstract class ByteEncoderStream implements TransformStream<Uint8Array, string> {
  readonly #stream: TransformStream<Uint8Array, string>;

  constructor(encoder: ByteEncoder, regulator: ByteEncoderStreamRegulator) {
    this.#stream = new TransformStream<Uint8Array, string>(ByteEncoderStream._createTransformer(encoder, regulator));
  }

  protected static _createTransformer(encoder: ByteEncoder, regulator: ByteEncoderStreamRegulator): Transformer<Uint8Array, string> {
    return {
      transform(chunk: Uint8Array, controller: TransformStreamDefaultController<string>): void {
        const toEncode = regulator.regulate(chunk);
        const encoded = encoder.encode(toEncode);
        controller.enqueue(encoded);
      },
      flush(controller: TransformStreamDefaultController<string>): void {
        const toEncode = regulator.flush();
        if (toEncode.length > 0) {
          const encoded = encoder.encode(toEncode);
          controller.enqueue(encoded);
        }
      },
    };
  }

  /**
   * @see [TransformStream.writable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/writable)
   */
  get writable(): WritableStream<Uint8Array> {
    return this.#stream.writable;
  }

  /**
   * @see [TransformStream.readable](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream/readable)
   */
  get readable(): ReadableStream<string> {
    return this.#stream.readable;
  }
}
Object.freeze(ByteEncoderStream);

export {
  type ByteDecoder,
  type ByteEncoder,
  type ByteDecoderStreamRegulator,
  type ByteEncoderStreamRegulator,
  ByteDecoderStream,
  ByteEncoderStream,
};
