import { _Base64DecoderStreamRegulator } from "./_decoder_stream_regulator.mts";
import { _DecoderStreamBase } from "../_decoder_stream_base.mts";
import { Base64DecoderOptions } from "./decoder_options.mts";

export class Base64DecoderStream extends _DecoderStreamBase {
  readonly #options: Required<Base64DecoderOptions>;
  constructor(options?: Base64DecoderOptions) {
    super({
      decode: (text) => Uint8Array.fromBase64(text, this.#options),
    }, new _Base64DecoderStreamRegulator());
    this.#options = Base64DecoderOptions.resolve(options);
  }
}
