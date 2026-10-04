import { _EncoderStreamBase } from "../_encoder_stream_base.mts";
import { _HexEncoderStreamRegulator } from "./_encoder_stream_regulator.mts";

export class HexEncoderStream extends _EncoderStreamBase {
  constructor() {
    super({
      encode: (bytes) => bytes.toHex(),
    }, new _HexEncoderStreamRegulator());
  }
}
