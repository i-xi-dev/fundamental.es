import { _decode, _PercentOptions } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";
import { _PercentDecoderOptions } from "./_decoder_options.mts";
import { _T } from "../../../_common/mod.mts";

export class _PercentDecoder implements _Decoder {
  readonly #options: Required<_PercentDecoderOptions>;

  constructor(options?: _PercentDecoderOptions) {
    this.#options = _PercentOptions.resolve(options);
  }

  decode(text: string): _T.Bytes {
    return _decode(text, this.#options);
  }
}
