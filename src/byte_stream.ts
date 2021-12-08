//

import {
  AbortError,
  TimeoutError,
} from "./error";
import {
  ProgressOptions,
  Progress,
} from "./progress";

/**
 * 読み取るストリームのサイズを明示しなかった場合のバッファーサイズ
 */
const DEFAULT_BUFFER_SIZE = 1_048_576;

/**
 * 可読ストリームを読み取り、チャンクを返却する非同期ジェネレーターを返却
 * 
 * @experimental
 * @param reader 可読ストリームのリーダー
 * @returns チャンクを返却する非同期ジェネレーター
 */
async function* createChunkGenerator(reader: ReadableStreamDefaultReader<Uint8Array>): AsyncGenerator<Uint8Array, void, void> {
  // XXX ReadableStreamBYOBReaderにする？ Deno,Safari,Firefoxが未実装 2021-08
  // XXX ReadableStream自体が[Symbol.asyncIterator]を持つ。
  for (let i = await reader.read(); (i.done !== true); i = await reader.read()) {
    yield i.value;
  }
}

/**
 * bufferのloadedByteCountの位置にchunkBytesをセットする
 * bufferのサイズが不足する場合、新たにサイズ拡張したUint8Arrayを生成しbufferの内容をコピーする
 * サイズ拡張したUint8Arrayを生成した場合、生成したUint8Arrayを返却し、それ以外の場合は引数bufferをそのまま返却する
 * 
 * @param buffer chunkBytesをセットする先のUint8Array
 * @param loadedByteCount bufferのchunkBytesをセットする開始位置
 * @param chunkBytes bufferの指定位置にセットするUint8Array
 * @returns bufferまたは、bufferを拡張したUint8Array
 */
function addToBuffer(buffer: Uint8Array, loadedByteCount: number, chunkBytes: Uint8Array): Uint8Array {
  let work = buffer;
  if ((loadedByteCount + chunkBytes.byteLength) > buffer.byteLength) {
    const extent = Math.max(chunkBytes.byteLength, DEFAULT_BUFFER_SIZE);
    const extendedBuffer = new Uint8Array(loadedByteCount + (extent * 10)); // XXX どのくらいが適正？
    extendedBuffer.set(buffer, 0);
    work = extendedBuffer;
  }
  work.set(chunkBytes, loadedByteCount);
  return work;
}
// XXX 最後に連結すべき（おそらくそのうちArrayBufferの長さ可変がES仕様になる）


// 中断シグナル:（絶え間なく読めるストリームの場合、すべて読み取るまで中断されない）
// タイムアウト:（絶え間なく読めるストリームの場合、すべて読み取るまでタイムアウトされない）

// ProgressEventの発火に関する仕様は、XHRおよびFileReaderの仕様を参考にした
// が、loadstart発火前にrejectすることがある
class _ByteStreamReader extends Progress {
  #stream: ReadableStream<Uint8Array>;
  #bufferSize: number;

  constructor(stream: ReadableStream<Uint8Array>, options?: ProgressOptions) {
    super(options);

    this.#stream = stream;
    this.#bufferSize = (typeof this.total === "number") ? this.total : DEFAULT_BUFFER_SIZE;

    Object.seal(this);
  }

  async read(): Promise<Uint8Array> {
    if (this._isBeforeStart() !== true) {
      throw new Error("invalid state");
    }

    try {
      const reader: ReadableStreamDefaultReader<Uint8Array> = this.#stream.getReader();
      const chunkGenerator: AsyncGenerator<Uint8Array, void, void> = createChunkGenerator(reader);

      if (this._signal instanceof AbortSignal) {
        if (this._signal.aborted === true) {
          throw new AbortError("already aborted");
        }

        this._signal.addEventListener("abort", (): void => {
        // this.#stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
          void reader.cancel().catch(); // XXX closeで良い？
        }, {
          once: true,
          passive: true,
        });
      }

      let buffer: Uint8Array = new Uint8Array(this.#bufferSize);
      this.start();

      for await (const chunkBytes of chunkGenerator) {
        if (this.isExpired()) {
          throw new TimeoutError(`timeout`);// TODO abort()の中にできる？
        }

        buffer = addToBuffer(buffer, this.value, chunkBytes);
        this.update(this.value + chunkBytes.byteLength);
      }
      if (this._signal?.aborted === true) {
        this.abort();
        throw new AbortError("aborted");// TODO abort()の中にできる？
      }

      let totalBytes: Uint8Array;
      if (buffer.byteLength !== this.value) {
        // totalBytes = buffer.subarray(0, this.value);
        totalBytes = buffer.slice(0, this.value);
      }
      else {
        totalBytes = buffer;
      }

      this.complete();
      return totalBytes;
    }
    catch (exception) {
      if (exception instanceof AbortError) {
        //
      }
      else if (exception instanceof TimeoutError) {
        //
      }
      else {
        this.fail();
      }
      throw exception;
    }
    finally {
      this.end();
    }
  }
}
Object.freeze(_ByteStreamReader);

class ByteStreamReader {
  create(stream: ReadableStream<Uint8Array>, options?: ProgressOptions): _ByteStreamReader {
    return new _ByteStreamReader(stream, options);
  }
}

export { ByteStreamReader };
