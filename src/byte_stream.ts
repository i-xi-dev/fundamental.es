//

import {
  type TransferOptions,
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
class ByteStreamReader extends TransferProgress<Uint8Array> {
  #stream: ReadableStream<Uint8Array>;
  #reader: ReadableStreamDefaultReader<Uint8Array>;
  #buffer: Uint8Array;

  private constructor(stream: ReadableStream<Uint8Array>, options?: TransferOptions) {
    super(options);

    this.#stream = stream;
    this.#reader = this.#stream.getReader();
    const bufferSize = (typeof this.total === "number") ? this.total : DEFAULT_BUFFER_SIZE;
    this.#buffer = new Uint8Array(bufferSize);

    Object.seal(this);
  }

  static create(stream: ReadableStream<Uint8Array>, options?: TransferOptions): ByteStreamReader {
    return new ByteStreamReader(stream, options);
  }

  protected override _terminate(): void {
    // this.#stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
    void this.#reader.cancel().catch(); // XXX closeで良い？
  }

  protected override _transfer(chunkBytes: Uint8Array): number {
    this.#buffer = addToBuffer(this.#buffer, this.loaded, chunkBytes);
    return chunkBytes.byteLength;
  }

  async readAsUint8Array(): Promise<Uint8Array> {
    const chunkGenerator: AsyncGenerator<Uint8Array, void, void> = createChunkGenerator(this.#reader);

    await this._initiate(chunkGenerator);

    if (this.#buffer.byteLength !== this.loaded) {
      // return buffer.subarray(0, this.loaded);
      return this.#buffer.slice(0, this.loaded);
    }
    else {
      return this.#buffer;
    }
  }

}
Object.freeze(ByteStreamReader);

export { ByteStreamReader };
