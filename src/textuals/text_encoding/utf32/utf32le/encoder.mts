import { _createEncoderInit } from "../_encoder_init.mts";
import { _EncoderBase } from "../../_encoder_base.mts";
import { _NAME } from "./_common.mts";
import { EncoderOptions } from "../../encoder_options.mts";

export class Utf32LeEncoder extends _EncoderBase {
  constructor(options?: EncoderOptions) {
    super(_createEncoderInit(_NAME, true, options));
  }
}
