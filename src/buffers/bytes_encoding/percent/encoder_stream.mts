import { _EncoderStreamBase } from "../_encoder_stream_base.mts";
import { _PercentEncoderStreamRegulator } from "./_encoder_stream_regulator.mts";
import { PercentEncoder } from "./encoder.mts";
import { PercentEncoderOptions } from "./encoder_options.mts";

export class PercentEncoderStream extends _EncoderStreamBase {
  constructor(options?: PercentEncoderOptions) {
    super(new PercentEncoder(options), new _PercentEncoderStreamRegulator());
  }
}
