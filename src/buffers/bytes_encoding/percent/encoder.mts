import type { TypeAlias } from "../../../_internal/type_alias/mod.mts";
import { _encode, _PercentOptions } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";
import { PercentEncoderOptions } from "./encoder_options.mts";

export class PercentEncoder implements _Encoder {
  readonly #options: Required<PercentEncoderOptions>;

  constructor(options?: PercentEncoderOptions) {
    this.#options = _PercentOptions.resolve(options);
  }

  encode(bytes: TypeAlias.Bytes): string {
    return _encode(bytes, this.#options);
  }
}
