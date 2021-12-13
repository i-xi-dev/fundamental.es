//

import { NumberUtils } from "./number_utils";
import {
  type TransferOptions,
  type TransferProgressIndicator,
  TransferProgress,
} from "./transfer_progress";

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

const ByteStreamReader = {
  createReadingProgress(stream: ReadableStream<Uint8Array>, options?: TransferOptions): TransferProgress<Uint8Array> {
    const reader: ReadableStreamDefaultReader<Uint8Array> = stream.getReader();
    const totalUnitCount: number | undefined = ((typeof options?.total === "number") && NumberUtils.isNonNegativeInteger(options.total)) ? options.total : undefined;
    const bufferSize = (typeof totalUnitCount === "number") ? totalUnitCount : DEFAULT_BUFFER_SIZE;
    let buffer: Uint8Array = new Uint8Array(bufferSize);

    return new TransferProgress<Uint8Array>({
      chunkGenerator: createChunkGenerator(reader),

      transferChunk(chunkBytes: Uint8Array, indicator: TransferProgressIndicator): void {
        buffer = addToBuffer(buffer, indicator.loadedUnitCount, chunkBytes);
        indicator.loadedUnitCount = indicator.loadedUnitCount + chunkBytes.byteLength;
      },

      terminate(): void {
        // this.#stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
        void reader.cancel().catch(); // XXX closeで良い？
      },

      transferredResult(indicator: TransferProgressIndicator): Uint8Array {
        if (buffer.byteLength !== indicator.loadedUnitCount) {
          // return buffer.subarray(0, this.loaded);
          return buffer.slice(0, indicator.loadedUnitCount);
        }
        else {
          return buffer;
        }
      },
    }, options);
  },

  async readAsUint8Array(stream: ReadableStream<Uint8Array>, totalByteCount?: number): Promise<Uint8Array> {
    const progress = this.createReadingProgress(stream, { total: totalByteCount });
    return await progress.initiate();
  },
};
Object.freeze(ByteStreamReader);

export { ByteStreamReader };
