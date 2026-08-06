import { _Utf8DecoderOptions } from "./_common.mts";

export type Utf8DecoderOptions = _Utf8DecoderOptions;

export namespace Utf8DecoderOptions {
  export function resolve(
    options?: Utf8DecoderOptions,
  ): Required<Utf8DecoderOptions> {
    return {
      ignoreBOM: options?.ignoreBOM === true,
      fatal: options?.fatal === true,
    };
  }
}
