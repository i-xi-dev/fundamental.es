import { _EncoderInit } from "./_encoder_init.mts";
import { EncoderStream } from "./encoder_stream.mts";
import { Fallback } from "./fallback.mts";
import { Text } from "../textual/mod.mts";
import { Type, TypeAlias } from "../type/mod.mts";

export abstract class _EncoderStreamBase implements EncoderStream {
  readonly #init: _EncoderInit;
  readonly #stream: TransformStream<string, TypeAlias.Bytes>;
  _pendingText: string | null;

  protected constructor(init: _EncoderInit) {
    this.#init = init;
    this._pendingText = null;
    const self = () => this;
    this.#stream = new TransformStream({
      transform(
        chunk: string,
        controller: TransformStreamDefaultController<TypeAlias.Bytes>,
      ): void {
        try {
          const toEncode = `${self()._pendingText ?? Text.EMPTY}${chunk}`;
          const { encodedBytes, pendingText } = init.encode(toEncode, true);
          self()._pendingText = pendingText;
          if (encodedBytes.length > 0) {
            controller.enqueue(encodedBytes);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
      flush(
        controller: TransformStreamDefaultController<TypeAlias.Bytes>,
      ): void {
        try {
          if (Type.isString(self()._pendingText) === true) {
            const { encodedBytes } = init.encode(self()._pendingText!); // エンコードエラーになるはず
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

  get readable(): ReadableStream<TypeAlias.Bytes> {
    return this.#stream.readable;
  }

  get writable(): WritableStream<string> {
    return this.#stream.writable;
  }
}
