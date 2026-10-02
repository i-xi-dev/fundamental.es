import { _createEncoderInit } from "./_encoder_init.mts";
import { _EncoderStreamBase } from "../_encoder_stream_base.mts";
import { EncoderOptions } from "../encoder_options.mts";

// 実装サンプル（ふつうはTextEncoderStreamを使えば良い）

export class Utf8EncoderStream extends _EncoderStreamBase {
  constructor(options?: EncoderOptions) {
    super(_createEncoderInit(options));
  }
}
