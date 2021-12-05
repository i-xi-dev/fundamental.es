//

import { NumberUtils } from "./number_utils";

type ResolvedOptions = {
  /**
   * 読取ProgressEventのターゲット
   */
  progressListener: EventTarget | null,

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

  /**
   * 見積サイズが明示されている場合に、見積サイズと実サイズの不一致を許容するか否か
   */
  acceptSizeMismatch: boolean,
};

type Options = {
  /** @see {@link ResolvedOptions.progressListener} */
  progressListener?: EventTarget,

  /** @see {@link ResolvedOptions.signal} */
  signal?: AbortSignal,

  /** @see {@link ResolvedOptions.timeout} */
  timeout?: number,

  /** @see {@link ResolvedOptions.acceptSizeMismatch} */
  acceptSizeMismatch?: boolean,
};

const DefaultOptions = Object.freeze({
  progressListener: null,
  signal: null,
  timeout: Number.POSITIVE_INFINITY,
  acceptSizeMismatch: true,
});

function resolveOptions(options: Options | ResolvedOptions = DefaultOptions): ResolvedOptions {
  const progressListener = (options.progressListener instanceof EventTarget) ? options.progressListener : DefaultOptions.progressListener;
  const signal = (options.signal instanceof AbortSignal) ? options.signal : DefaultOptions.signal;
  const timeout = ((typeof options.timeout === "number") && NumberUtils.isPositiveInteger(options.timeout)) ? options.timeout : DefaultOptions.timeout;
  const acceptSizeMismatch: boolean = (typeof options.acceptSizeMismatch === "boolean") ? options.acceptSizeMismatch : false;

  return {
    progressListener,
    signal,
    timeout,
    acceptSizeMismatch,
  };
}

/**
 * 読み取るストリームのサイズを明示しなかった場合のバッファーサイズ
 */
const DEFAULT_BUFFER_SIZE = 1_048_576;

/**
 * イベントターゲットにプログレスイベントを発火する
 * 
 * @param target イベントターゲット
 * @param eventName イベント名
 * @param loadedByteCount 読み取ったバイト数
 * @param totalByteCount 読み取り対象の総バイト数
 */
function notify(target: EventTarget | null, eventName: string, loadedByteCount: number, totalByteCount?: number): void {
  if (target instanceof EventTarget) {
    const event: ProgressEvent = new ProgressEvent(eventName, {
      lengthComputable: (totalByteCount !== undefined),
      loaded: loadedByteCount,
      total: totalByteCount,
    });
    target.dispatchEvent(event);
  }
}

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

class ByteStreamReader {

  constructor() {
    Object.freeze(this);
  }

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

    const reader: ReadableStreamDefaultReader<Uint8Array> = stream.getReader();
    const chunkGenerator: AsyncGenerator<Uint8Array, void, void> = createChunkGenerator(reader);

    if (resolvedOptions.signal instanceof AbortSignal) {
      if (resolvedOptions.signal.aborted === true) {
        throw new Error("AbortError: already aborted");
      }

      resolvedOptions.signal.addEventListener("abort", (): void => {
        // stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
        void reader.cancel().catch(); // XXX closeで良い？
      }, {
        once: true,
      });
    }

    const startTime = performance.now();
    let buffer: Uint8Array = new Uint8Array(bufferSize);

    let loadedByteCount = 0;
    for await (const chunkBytes of chunkGenerator) {
      if (resolvedOptions.acceptSizeMismatch !== true) {
        if ((typeof totalByteCount === "number") && ((loadedByteCount + chunkBytes.byteLength) > totalByteCount)) {
          // 見積サイズに対して超過
          throw new Error("DataError: size too long");
        }
      }

      const elapsed = performance.now() - startTime;
      if (elapsed >= resolvedOptions.timeout) {
        throw new Error("TimeoutError: elapsed:" + elapsed.toString(10) + ", loaded:" + loadedByteCount.toString(10));
      }

      buffer = addToBuffer(buffer, loadedByteCount, chunkBytes);
      loadedByteCount = loadedByteCount + chunkBytes.byteLength;

      notify(resolvedOptions.progressListener, "progress", loadedByteCount, totalByteCount);
    }
    if (resolvedOptions.signal?.aborted === true) {
      throw new Error("AbortError: aborted");
    }

    if (resolvedOptions.acceptSizeMismatch !== true) {
      if ((typeof totalByteCount === "number") && (loadedByteCount < totalByteCount)) {
        // 見積サイズに対して不足
        throw new Error("DataError: size too short");
      }
    }

    let totalBytes: Uint8Array;
    if ((totalByteCount === undefined) || (buffer.byteLength > loadedByteCount)) {
      totalBytes = buffer.subarray(0, loadedByteCount);// XXX こっちが良い？ return buffer.buffer.slice(0, loadedByteCount);
    }
    else {
      totalBytes = buffer;
    }

    return totalBytes;
  }
}
Object.freeze(ByteStreamReader);
