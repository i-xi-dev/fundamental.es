import { _BinaryStringEncoderStreamRegulator } from "./_encoder_stream_regulator.mts";
import { _encode } from "./_common.mts";
import { _EncoderStreamBase } from "../_encoder_stream_base.mts";

export class _BinaryStringEncoderStream extends _EncoderStreamBase {
  constructor() {
    super({
      encode: (bytes) => _encode(bytes),
    }, new _BinaryStringEncoderStreamRegulator());
  }
}
