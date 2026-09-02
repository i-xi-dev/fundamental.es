import { _createDecoderInit } from "./_decoder_init.mts";
import { _DecoderBase } from "../_decoder_base.mts";
import { DecoderOptions } from "../decoder_options.mts";

export class Utf8Decoder extends _DecoderBase {
  constructor(options?: DecoderOptions) {
    super(_createDecoderInit(options));
  }
}
