import { _Base64DecoderOptions } from "./_decoder_options.mts";
import { _Base64DecoderStreamRegulator } from "./_decoder_stream_regulator.mts";
import { _DecoderStreamBase } from "../_decoder_stream_base.mts";

export class _Base64DecoderStream extends _DecoderStreamBase {
  readonly #options: Required<_Base64DecoderOptions>;
  constructor(options?: _Base64DecoderOptions) {
    super({
      decode: (text) => Uint8Array.fromBase64(text, this.#options),
    }, new _Base64DecoderStreamRegulator());
    this.#options = _Base64DecoderOptions.resolve(options);
  }
}
