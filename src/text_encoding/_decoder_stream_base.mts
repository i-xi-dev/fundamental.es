import { _BOM } from "./_utf.mts";
import { _DecoderInit } from "./_decoder_init.mts";
import { _Type } from "../_common/mod.mts";
import { DecoderStream } from "./decoder_stream.mts";
import { Fallback } from "./fallback.mts";

export abstract class _DecoderStreamBase implements DecoderStream {
  readonly #init: _DecoderInit;
  readonly #stream: TransformStream<_Type.Bytes, string>;
  _pendingBytes: _Type.Bytes | null;
  _enqueued: boolean;

  protected constructor(init: _DecoderInit) {
    this.#init = init;
    this._pendingBytes = null;
    this._enqueued = false;
    const self = () => this;
    this.#stream = new TransformStream({
      transform(
        chunk: _Type.Bytes,
        controller: TransformStreamDefaultController<string>,
      ): void {
        try {
          let toDecode: _Type.Bytes;
          const pendingBytesB = self()._pendingBytes;
          if (_Type.isNonSharedUint8Array(pendingBytesB) === true) {
            toDecode = new Uint8Array(pendingBytesB.length + chunk.length);
            toDecode.set(pendingBytesB);
            toDecode.set(chunk, pendingBytesB.length);
          } else {
            toDecode = chunk;
          }
          const { decodedText, pendingBytes } = init.decode(toDecode, true);
          self()._pendingBytes = pendingBytes;
          if (decodedText.length > 0) {
            if (
              (self()._enqueued !== true) && (init.ignoreBom !== true) &&
              decodedText.startsWith(_BOM)
            ) {
              controller.enqueue(decodedText.substring(1));
            } else {
              controller.enqueue(decodedText);
            }
            self()._enqueued = true;
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
      flush(controller: TransformStreamDefaultController<string>): void {
        try {
          const pendingBytesB = self()._pendingBytes;
          if (_Type.isNonSharedUint8Array(pendingBytesB) === true) {
            const { decodedText } = init.decode(pendingBytesB); // UTF-*ならデコードエラーになるはず（それ以外は符号化方式による）
            controller.enqueue(decodedText);
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

  // get ignoreBom(): boolean {
  //   return this.#init.ignoreBom === true;
  // }

  get readable(): ReadableStream<string> {
    return this.#stream.readable;
  }

  get writable(): WritableStream<_Type.Bytes> {
    return this.#stream.writable;
  }
}
