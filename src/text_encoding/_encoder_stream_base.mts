import { _Type } from "../_common/mod.mts";
import { _EncoderInit } from "./_encoder_init.mts";
import { EncoderStream } from "./encoder_stream.mts";
import { Fallback } from "./fallback.mts";

export abstract class EncoderStreamBase implements EncoderStream {
  readonly #init: _EncoderInit;
  readonly #stream: TransformStream<string, _Type.Bytes>;
  _pendingText: string | null;

  protected constructor(init: _EncoderInit) {
    this.#init = init;
    this._pendingText = null;
    const self = () => this;
    this.#stream = new TransformStream({
      transform(
        chunk: string,
        controller: TransformStreamDefaultController<_Type.Bytes>,
      ): void {
        try {
          const { encodedBytes, pendingText } = init.encode(chunk, true);
          self()._pendingText = pendingText;
          if (encodedBytes.length > 0) {
            controller.enqueue(encodedBytes);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
      flush(controller: TransformStreamDefaultController<_Type.Bytes>): void {
        try {
          if (_Type.isString(self()._pendingText) === true) {
            const { encodedBytes } = init.encode(self()._pendingText!);
            controller.enqueue(encodedBytes);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
    });
  }

  get encoding(): string {
    return this.#init.name;
  }

  get fatal(): boolean {
    return this.#init.fallback === Fallback.EXCEPTION;
  }

  get readable(): ReadableStream<_Type.Bytes> {
    return this.#stream.readable;
  }

  get writable(): WritableStream<string> {
    return this.#stream.writable;
  }
}
