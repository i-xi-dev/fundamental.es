import { _EncoderStreamBase } from "../_encoder_stream_base.mts";
import { _PercentEncoder } from "./_encoder.mts";
import { _PercentEncoderOptions } from "./_encoder_options.mts";
import { _PercentEncoderStreamRegulator } from "./_encoder_stream_regulator.mts";

export class _PercentEncoderStream extends _EncoderStreamBase {
  constructor(options?: _PercentEncoderOptions) {
    super(new _PercentEncoder(options), new _PercentEncoderStreamRegulator());
  }
}
