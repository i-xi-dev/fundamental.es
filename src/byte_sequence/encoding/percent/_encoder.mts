import { _encode, _PercentOptions } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";
import { _PercentEncoderOptions } from "./_encoder_options.mts";
import { _T } from "../../../_common/mod.mts";

export class _PercentEncoder implements _Encoder {
  readonly #options: Required<_PercentEncoderOptions>;

  constructor(options?: _PercentEncoderOptions) {
    this.#options = _PercentOptions.resolve(options);
  }

  encode(bytes: _T.Bytes): string {
    return _encode(bytes, this.#options);
  }
}
