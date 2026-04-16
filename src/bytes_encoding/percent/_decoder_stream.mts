import { _DecoderStreamBase } from "../_decoder_stream_base.mts";
import { _PercentDecoder } from "./_decoder.mts";
import { _PercentDecoderOptions } from "./_decoder_options.mts";
import { _PercentDecoderStreamRegulator } from "./_decoder_stream_regulator.mts";

export class _PercentDecoderStream extends _DecoderStreamBase {
  constructor(options?: _PercentDecoderOptions) {
    super(new _PercentDecoder(options), new _PercentDecoderStreamRegulator());
  }
}
