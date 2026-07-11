import { _Encoder } from "../_encoder.mts";
import { _T } from "../../../_common/mod.mts";
import { Base64EncoderOptions } from "./encoder_options.mts";

export class Base64Encoder implements _Encoder {
  readonly #options: Required<Base64EncoderOptions>;

  constructor(options?: Base64EncoderOptions) {
    this.#options = Base64EncoderOptions.resolve(options);
  }

  encode(bytes: _T.Bytes): string {
    return bytes.toBase64(this.#options);
  }
}
