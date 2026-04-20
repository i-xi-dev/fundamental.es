import { _Base64EncoderOptions } from "./_encoder_options.mts";
import { _Base64EncoderStreamRegulator } from "./_encoder_stream_regulator.mts";
import { _EncoderStreamBase } from "../_encoder_stream_base.mts";

export class _Base64EncoderStream extends _EncoderStreamBase {
  readonly #options: Required<_Base64EncoderOptions>;
  constructor(options?: _Base64EncoderOptions) {
    super({
      encode: (bytes) => bytes.toBase64(this.#options),
    }, new _Base64EncoderStreamRegulator());
    this.#options = _Base64EncoderOptions.resolve(options);
  }
}
//TODO
/*

  if (_T.isNonSharedUint8Array(bytes) !== true) {
    throw new TypeError(_Message.build("E10002"));
  }

*/
