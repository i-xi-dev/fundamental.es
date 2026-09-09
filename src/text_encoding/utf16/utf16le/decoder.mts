import { _createDecoderInit } from "../_decoder_init.mts";
import { _DecoderBase } from "../../_decoder_base.mts";
import { _NAME } from "./_common.mts";
import { DecoderOptions } from "../../decoder_options.mts";

export class Utf16LeDecoder extends _DecoderBase {
  constructor(options?: DecoderOptions) {
    super(_createDecoderInit(_NAME, true, options));
  }
}
