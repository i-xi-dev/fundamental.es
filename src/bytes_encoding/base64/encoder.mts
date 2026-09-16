import { _Encoder } from "../_encoder.mts";
import { Base64EncoderOptions } from "./encoder_options.mts";
import { TypeAlias } from "../../type/mod.mts";

export class Base64Encoder implements _Encoder {
  readonly #options: Required<Base64EncoderOptions>;

  constructor(options?: Base64EncoderOptions) {
    this.#options = Base64EncoderOptions.resolve(options);
  }

  encode(bytes: TypeAlias.Bytes): string {
    return bytes.toBase64(this.#options);
  }
}
