import { _createEncoderInit } from "../_encoder_init.mts";
import { _EncoderStreamBase } from "../../_encoder_stream_base.mts";
import { _NAME } from "./_common.mts";
import { EncoderOptions } from "../../encoder_options.mts";

export class Utf16LeEncoderStream extends _EncoderStreamBase {
  constructor(options?: EncoderOptions) {
    super(_createEncoderInit(_NAME, true, options));
  }
}
