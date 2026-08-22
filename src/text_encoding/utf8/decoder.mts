import { _decode, _NAME } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";
import { _Type } from "../../_common/mod.mts";
import { DecoderOptions } from "../decoder_options.mts";

export class Utf8Decoder implements _Decoder {
  readonly #options: Required<DecoderOptions>;
  readonly #decoder: TextDecoder;

  constructor(options?: DecoderOptions) {
    this.#options = DecoderOptions.resolve(options);
    this.#decoder = new TextDecoder(_NAME, this.#options);
  }

  get encoding(): string {
    return this.#decoder.encoding;
  }

  get fatal(): boolean {
    return this.#decoder.fatal;
  }

  decode(bytes: _Type.Bytes /* , options?: TextDecodeOptions */): string {
    return _decode(bytes, this.#options, /* options, */ this.#decoder);
  }
}
