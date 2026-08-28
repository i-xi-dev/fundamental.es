import { _DecoderBase } from "../_decoder_base.mts";
import { _NAME } from "./_common.mts";
import { _Type } from "../../_common/mod.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { Fallback } from "../fallback.mts";

export class Utf8Decoder extends _DecoderBase {
  readonly #decoder: TextDecoder;

  constructor(options?: DecoderOptions) {
    super({
      name: _NAME.toLowerCase(),
      replacement: "\uFFFD",
      bomBytes: Uint8Array.of(0xEF, 0xBB, 0xBF),
      fallback: (options?.fatal === true)
        ? Fallback.EXCEPTION
        : Fallback.REPLACEMENT, // 使用しない
      ignoreBom: options?.ignoreBOM,
    });
    this.#decoder = new TextDecoder(_NAME, {
      fatal: options?.fatal === true,
      ignoreBOM: true,
    });
  }

  _decode(bytes: _Type.Bytes): string {
    return this.#decoder.decode(bytes);
  }
}
