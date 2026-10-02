import { _createDecoderInit } from "./_decoder_init.mts";
import { _DecoderStreamBase } from "../_decoder_stream_base.mts";
import { DecoderOptions } from "../decoder_options.mts";

// 実装サンプル（ふつうはTextDecoderStreamを使えば良い）

export class Utf8DecoderStream extends _DecoderStreamBase {
  constructor(options?: DecoderOptions) {
    super(_createDecoderInit(options));
  }
}
