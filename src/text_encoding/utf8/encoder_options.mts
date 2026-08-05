import { _Utf8EncoderOptions } from "./_common.mts";

export type Utf8EncoderOptions = _Utf8EncoderOptions;

export namespace Utf8EncoderOptions {
  export function resolve(
    options?: Utf8EncoderOptions,
  ): Required<Utf8EncoderOptions> {
    return {
      prependBOM: options?.prependBOM === true,
      fatal: options?.fatal === true,
    };
  }
}
