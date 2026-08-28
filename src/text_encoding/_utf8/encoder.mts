import { _Error, _Type } from "../../_common/mod.mts";
import { _EncoderBase } from "../_encoder_base.mts";
import { _NAME } from "./_common.mts";
import { EncoderOptions } from "../encoder_options.mts";
import { Fallback } from "../fallback.mts";

export class Utf8Encoder extends _EncoderBase {
  readonly #encoder: TextEncoder;

  constructor(options?: EncoderOptions) {
    super({
      name: _NAME.toLowerCase(),
      replacement: Uint8Array.of(/* 使用しないので。 */),
      fallback: (options?.fatal === true)
        ? Fallback.EXCEPTION
        : Fallback.REPLACEMENT,
      prependBom: options?.prependBOM,
    });
    this.#encoder = new TextEncoder();
  }

  _encode(text: string): _Type.Bytes {
    if (this._fatal === true) {
      if (text.isWellFormed() !== true) {
        throw _Error.TextEncoding.encodingFailed(_NAME, "Input");
      }
    }

    return this.#encoder.encode(text);
  }
}
