import { _encode, _NAME } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";
import { _Type } from "../../_common/mod.mts";
import { Utf8EncoderOptions } from "./encoder_options.mts";

export class Utf8Encoder implements _Encoder {
  readonly #options: Required<Utf8EncoderOptions>;
  readonly #encoder: TextEncoder;

  constructor(options?: Utf8EncoderOptions) {
    this.#options = Utf8EncoderOptions.resolve(options);
    this.#encoder = new TextEncoder();
  }

  get encoding(): string {
    return _NAME.toLowerCase();
  }

  get fatal(): boolean {
    return this.#options.fatal;
  }

  encode(text: string): _Type.Bytes {
    return _encode(text, this.#options, this.#encoder);
  }
}
