import { _Base64EncoderStreamRegulator } from "./_encoder_stream_regulator.mts";
import { _EncoderStreamBase } from "../_encoder_stream_base.mts";
import { Base64EncoderOptions } from "./encoder_options.mts";

export class Base64EncoderStream extends _EncoderStreamBase {
  readonly #options: Required<Base64EncoderOptions>;
  constructor(options?: Base64EncoderOptions) {
    super({
      encode: (bytes) => bytes.toBase64(this.#options),
    }, new _Base64EncoderStreamRegulator());
    this.#options = Base64EncoderOptions.resolve(options);
  }
}
