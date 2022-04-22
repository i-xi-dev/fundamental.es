//

import {
  AbortError,
  InvalidStateError,
} from "./error";
import {
  type int,
  Integer,
} from "./int";
import { ByteBuffer } from "./byte_buffer";
import { ProgressEvent } from "./progress_event";

/**
 * 可読ストリームを読み取り、チャンクを返却する非同期ジェネレーターを返却
  // XXX ReadableStream自体が[Symbol.asyncIterator]を持つようになるので、そうなれば不要
 * 
 * @experimental
 * @param streamReader The reader created from `ReadableStream`.
 * @returns チャンクを返却する非同期ジェネレーター
 */
async function* _streamToAsyncGenerator<T>(streamReader: ReadableStreamDefaultReader<T>): AsyncGenerator<T, void, void> {
  try {
    for (let i = await streamReader.read(); (i.done !== true); i = await streamReader.read()) {
      yield i.value;
    }
  }
  catch (exception) {
    return;
  }
}

const _ReaderReadyState = {
  EMPTY: 0,
  LOADING: 1,
  DONE: 2,
} as const;
type _ReaderReadyState = typeof _ReaderReadyState[keyof typeof _ReaderReadyState];

/**
 * @experimental
 */
namespace ByteStream {
  /**
   * The options for the `ByteStream.Reader` with the following optional fields.
   */
  export type ReadingOptions = {
    /**
     * The total number of bytes in the byte stream.
     */
    totalByteLength?: int,

    // AbortSignalのreasonとtimeout()が標準化されたので、これは廃止する
    // /**
    //  * The number of milliseconds it takes for the `ByteStream.Reader.prototype.read` to end automatically.
    //  */
    // timeout?: number,

    /**
     * The `AbortSignal` object.
     */
    signal?: AbortSignal,
  };

  export class Reader extends EventTarget {
    #readyState: _ReaderReadyState;
    #loadedByteLength: int;
    #totalByteLength: int | undefined;
    #abortController: AbortController;
    #lastProgressNotifiedAt: number;

    constructor() {
      super();
      this.#readyState = _ReaderReadyState.EMPTY;
      this.#loadedByteLength = 0;
      this.#totalByteLength = undefined;
      this.#abortController = new AbortController();
      this.#lastProgressNotifiedAt = Number.MIN_VALUE;
      Object.seal(this);
    }

    // XXX 要るか？
    // get readyState(): _ReaderReadyState {
    //   return this.#readyState;
    // }

    get #indeterminate(): boolean {
      return ((typeof this.#totalByteLength === "number") !== true);
    }

    #notify(name: string): void {
      if (name === "progress") {
        const now = performance.now();
        if ((this.#lastProgressNotifiedAt + 50) > now) {
          return;
        }
        this.#lastProgressNotifiedAt = now;
      }

      const event = new ProgressEvent(name, {
        lengthComputable: (this.#indeterminate !== true),
        loaded: this.#loadedByteLength,
        total: this.#totalByteLength, // undefinedの場合ProgressEvent側で0となる
      });
      this.dispatchEvent(event);
    }

    async read(stream: ReadableStream<Uint8Array>, options?: ReadingOptions): Promise<Uint8Array> {
      if (this.#readyState !== _ReaderReadyState.EMPTY) {
        throw new InvalidStateError(`readyState: ${ this.#readyState }`);
      }

      const totalByteLength: number | undefined = options?.totalByteLength;
      if (typeof totalByteLength === "number") {
        if (Integer.isNonNegativeInteger(totalByteLength) !== true) {
          throw new RangeError("options.totalByteLength");
        }
      }
      else if (totalByteLength === undefined) {
        // ok
      }
      else {
        throw new TypeError("options.totalByteLength");
      }

      const reader: ReadableStreamDefaultReader<Uint8Array> = stream.getReader();

      const signal = options?.signal;
      if (signal instanceof AbortSignal) {
        // ストリームの最後の読み取りがキューされるまでに中止通達されれば中断する
        signal.addEventListener("abort", () => {
          // stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
          void reader.cancel().catch(); // XXX closeで良い？
        }, {
          once: true,
          passive: true,
          signal: this.#abortController.signal,
        });

        // 既に中止通達されている場合はエラーとする
        if (signal.aborted === true) {
          throw new AbortError(); // TODO signal.reasonが広く実装されたら、signal.reasonをthrowするようにする
        }
      }
      else if (signal === undefined) {
        // ok
      }
      else {
        throw new TypeError("options.signal");
      }

      const buffer: ByteBuffer = new ByteBuffer(totalByteLength);

      try {
        // started
        this.#notify("loadstart");

        const chunkGenerator = _streamToAsyncGenerator<Uint8Array>(reader);
        for await (const chunk of chunkGenerator) {
          if (signal?.aborted === true) {
            // aborted or expired
            throw new AbortError("aborted"); // TODO signal.reasonが広く実装されたら、signal.reasonをthrowするようにする
          }
          buffer.put(chunk);
          this.#loadedByteLength = buffer.position;
          this.#notify("progress");
        }


        // completed
        this.#notify("load");

        if (buffer.capacity !== buffer.position) {
          return buffer.slice();
        }
        else {
          return buffer.subarray();
        }
      }
      catch (exception) {
        if ((exception instanceof Error) && (exception.name === "AbortError")) {
          // ・呼び出し側のAbortControllerでreason省略でabortした場合
          // ・呼び出し側のAbortControllerでreason:AbortErrorでabortした場合
          this.#notify("abort");
        }
        else if ((exception instanceof Error) && (exception.name === "TimeoutError")) {
          // ・AbortSignal.timeoutでabortされた場合
          // ・呼び出し側のAbortControllerでreason:TimeoutErrorでabortした場合
          this.#notify("timeout");
        }
        else {
          // ・呼び出し側のAbortControllerでreason:AbortError,TimeoutError以外でabortした場合
          // ・その他のエラー
          this.#notify("error");
        }
        throw exception;
      }
      finally {
        this.#notify("loadend");

        // signalに追加したリスナーを削除
        this.#abortController.abort();
      }
    }
  }
  Object.seal(Reader);

}
Object.freeze(ByteStream);

export {
  ByteStream,
};
