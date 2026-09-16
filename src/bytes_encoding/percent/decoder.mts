import { _decode, _PercentOptions } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";
import { PercentDecoderOptions } from "./decoder_options.mts";
import { TypeAlias } from "../../type/mod.mts";

export class PercentDecoder implements _Decoder {
  readonly #options: Required<PercentDecoderOptions>;

  constructor(options?: PercentDecoderOptions) {
    this.#options = _PercentOptions.resolve(options);
  }

  decode(text: string): TypeAlias.Bytes {
    return _decode(text, this.#options);
  }
}
