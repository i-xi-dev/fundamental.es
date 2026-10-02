import { _createDecoderInit } from "../_decoder_init.mts";
import { _DecoderStreamBase } from "../../_decoder_stream_base.mts";
import { _NAME } from "./_common.mts";
import { DecoderOptions } from "../../decoder_options.mts";

// 実装サンプル（ふつうはTextDecoderStreamを使えば良い）

export class Utf16LeDecoderStream extends _DecoderStreamBase {
  constructor(options?: DecoderOptions) {
    super(_createDecoderInit(_NAME, true, options));
  }
}
