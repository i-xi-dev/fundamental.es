//

import {
  AbortError,
  TimeoutError,
} from "./error";
import { NumberUtils } from "./number_utils";
import { ProgressNotifier } from "./progress_notifier";

type ResolvedOptions = {
  /**
   * 中断シグナル
   * （絶え間なく読めるストリームの場合、すべて読み取るまで中断されない）
   */
  signal: AbortSignal | null,

  /**
   * タイムアウト（ミリ秒）
   * （絶え間なく読めるストリームの場合、すべて読み取るまでタイムアウトされない）
   */
  timeout: number,

  progressEventTarget: EventTarget | null,
};

type Options = {
  /** @see {@link ResolvedOptions.signal} */
  signal?: AbortSignal,

  /** @see {@link ResolvedOptions.timeout} */
  timeout?: number,

  progressEventTarget?: EventTarget,
};

function resolveOptions(options: Options | ResolvedOptions = {}): ResolvedOptions {
  const signal = (options.signal instanceof AbortSignal) ? options.signal : null;
  const timeout = ((typeof options.timeout === "number") && NumberUtils.isPositiveInteger(options.timeout)) ? options.timeout : Number.POSITIVE_INFINITY;
  const progressEventTarget = (options.progressEventTarget instanceof EventTarget) ? options.progressEventTarget : null;

  return {
    signal,
    timeout,
    progressEventTarget,
  };
}

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

// ProgressEventの発火に関する仕様は、XHRおよびFileReaderの仕様を参考にした
// が、loadstart発火前にrejectすることがある
class ByteStreamReader {

  async read(stream: ReadableStream<Uint8Array>, totalByteCount?: number, options?: Options | ResolvedOptions): Promise<Uint8Array> {
    let bufferSize: number;
    if (typeof totalByteCount === "number") {
      if (NumberUtils.isNonNegativeInteger(totalByteCount) !== true) {
        throw new TypeError("totalByteCount");
      }
      bufferSize = totalByteCount;
    }
    else if (totalByteCount === undefined) {
      bufferSize = DEFAULT_BUFFER_SIZE;
    }
    else {
      throw new TypeError("totalByteCount");
    }

    const resolvedOptions: ResolvedOptions = resolveOptions(options);
    const progressNotifier = new ProgressNotifier(resolvedOptions.progressEventTarget);

    let loadedByteCount = 0;
    try {
      const reader: ReadableStreamDefaultReader<Uint8Array> = stream.getReader();
      const chunkGenerator: AsyncGenerator<Uint8Array, void, void> = createChunkGenerator(reader);

      if (resolvedOptions.signal instanceof AbortSignal) {
        if (resolvedOptions.signal.aborted === true) {
          throw new AbortError("already aborted");
        }

        resolvedOptions.signal.addEventListener("abort", (): void => {
        // stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
          void reader.cancel().catch(); // XXX closeで良い？
        }, {
          once: true,
          passive: true,
        });
      }

      const startTime = performance.now();
      let buffer: Uint8Array = new Uint8Array(bufferSize);

      progressNotifier.notifyStart(0, totalByteCount);

      for await (const chunkBytes of chunkGenerator) {

        const elapsed = performance.now() - startTime;
        if (elapsed >= resolvedOptions.timeout) {
          progressNotifier.notifyTimeout(loadedByteCount, totalByteCount);
          throw new TimeoutError(`elapsed: ${ elapsed.toString(10) }, loaded: ${ loadedByteCount.toString(10) }`);
        }

        buffer = addToBuffer(buffer, loadedByteCount, chunkBytes);
        loadedByteCount = loadedByteCount + chunkBytes.byteLength;

        progressNotifier.notifyProgress(loadedByteCount, totalByteCount);
      }
      if (resolvedOptions.signal?.aborted === true) {
        progressNotifier.notifyAborted(loadedByteCount, totalByteCount);
        throw new AbortError("aborted");
      }

      let totalBytes: Uint8Array;
      if ((totalByteCount === undefined) || (buffer.byteLength > loadedByteCount)) {
        // totalBytes = buffer.subarray(0, loadedByteCount);
        totalBytes = buffer.slice(0, loadedByteCount);
      }
      else {
        totalBytes = buffer;
      }

      progressNotifier.notifyCompleted(loadedByteCount, totalByteCount);
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
        progressNotifier.notifyFailed(loadedByteCount, totalByteCount);
      }
      throw exception;
    }
    finally {
      progressNotifier.notifyEnd(loadedByteCount, totalByteCount);
    }
  }
}
Object.freeze(ByteStreamReader);

export type {
  Options as ByteStreamReadOptions,
};

export { ByteStreamReader };
