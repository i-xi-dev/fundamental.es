import { _DecoderStreamBase } from "../_decoder_stream_base.mts";
import { _PercentDecoderStreamRegulator } from "./_decoder_stream_regulator.mts";
import { PercentDecoder } from "./decoder.mts";
import { PercentDecoderOptions } from "./decoder_options.mts";

export class PercentDecoderStream extends _DecoderStreamBase {
  constructor(options?: PercentDecoderOptions) {
    super(new PercentDecoder(options), new _PercentDecoderStreamRegulator());
  }
}
