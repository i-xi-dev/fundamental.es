import { _createEncoderInit } from "./_encoder_init.mts";
import { _EncoderBase } from "../_encoder_base.mts";
import { EncoderOptions } from "../encoder_options.mts";

// 実装サンプル（ふつうはTextEncoderを使えば良い）

export class Utf8Encoder extends _EncoderBase {
  constructor(options?: EncoderOptions) {
    super(_createEncoderInit(options));
  }
}
