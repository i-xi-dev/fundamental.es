import * as TypeAlias from "../../../_internal/type_alias/mod.mts";
import { _Decoder } from "../_decoder.mts";
import { Base64DecoderOptions } from "./decoder_options.mts";

export class Base64Decoder implements _Decoder {
  readonly #options: Required<Base64DecoderOptions>;

  constructor(options?: Base64DecoderOptions) {
    this.#options = Base64DecoderOptions.resolve(options);
  }

  decode(text: string): TypeAlias.Bytes {
    return Uint8Array.fromBase64(text, this.#options);
  }
}
