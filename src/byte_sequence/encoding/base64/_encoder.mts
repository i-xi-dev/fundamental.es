import { _Base64EncoderOptions } from "./_encoder_options.mts";
import { _Encoder } from "../_encoder.mts";
import { _T } from "../../../_common/mod.mts";

export class _Base64Encoder implements _Encoder {
  readonly #options: Required<_Base64EncoderOptions>;

  constructor(options?: _Base64EncoderOptions) {
    this.#options = _Base64EncoderOptions.resolve(options);
  }

  encode(bytes: _T.Bytes): string {
    return bytes.toBase64(this.#options);
  }
}
