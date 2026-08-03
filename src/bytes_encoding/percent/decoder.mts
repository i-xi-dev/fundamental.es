import { _decode, _PercentOptions } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";
import { _Type } from "../../_common/mod.mts";
import { PercentDecoderOptions } from "./decoder_options.mts";

export class PercentDecoder implements _Decoder {
  readonly #options: Required<PercentDecoderOptions>;

  constructor(options?: PercentDecoderOptions) {
    this.#options = _PercentOptions.resolve(options);
  }

  decode(text: string): _Type.Bytes {
    return _decode(text, this.#options);
  }
}
