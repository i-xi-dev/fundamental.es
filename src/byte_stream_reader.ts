//

import { NumberUtils } from "./number_utils";
import { ByteBuffer } from "./byte_buffer";
import { StreamUtils } from "./stream_utils";
import {
  type TransferOptions,
  TransferProgress,
} from "./transfer_progress";

// 中断シグナル:（絶え間なく読めるストリームの場合、すべて読み取るまで中断されない）
// タイムアウト:（絶え間なく読めるストリームの場合、すべて読み取るまでタイムアウトされない）

// ProgressEventの発火に関する仕様は、XHRおよびFileReaderの仕様を参考にした
// が、loadstart発火前にrejectすることがある

const ByteStreamReader = {
  createReadingProgress(stream: ReadableStream<Uint8Array>, options?: TransferOptions): TransferProgress<Uint8Array> {
    const reader: ReadableStreamDefaultReader<Uint8Array> = stream.getReader();
    const totalUnitCount: number | undefined = ((typeof options?.total === "number") && NumberUtils.isNonNegativeInteger(options.total)) ? options.total : undefined;
    const buffer: ByteBuffer = new ByteBuffer(totalUnitCount);

    return new TransferProgress<Uint8Array>({
      chunkGenerator: StreamUtils.streamToAsyncGenerator<Uint8Array>(reader),

      transferChunk(chunkBytes: Uint8Array): number {
        buffer.put(chunkBytes);
        return buffer.position;
      },

      terminate(): void {
        // this.#stream.cancel()しても読取終了まで待ちになるので、reader.cancel()する
        void reader.cancel().catch(); // XXX closeで良い？
      },

      transferredResult(): Uint8Array {
        if (buffer.capacity !== buffer.position) {
          return buffer.slice();
        }
        else {
          return buffer.subarray();
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

export {
  ByteStreamReader,
};
