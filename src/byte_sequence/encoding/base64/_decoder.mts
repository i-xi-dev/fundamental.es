import { _Base64DecoderOptions } from "./_decoder_options.mts";
import { _Decoder } from "../_decoder.mts";
import { _T } from "../../../_common/mod.mts";

export class _Base64Decoder implements _Decoder {
  readonly #options: Required<_Base64DecoderOptions>;

  constructor(options?: _Base64DecoderOptions) {
    this.#options = _Base64DecoderOptions.resolve(options);
  }

  decode(text: string): _T.Bytes {
    return Uint8Array.fromBase64(text, this.#options);
  }
}
