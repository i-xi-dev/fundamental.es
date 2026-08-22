export type DecoderOptions = {
  ignoreBOM?: boolean;
  fatal?: boolean;
};

export namespace DecoderOptions {
  export function resolve(
    options?: DecoderOptions,
  ): Required<DecoderOptions> {
    return {
      ignoreBOM: options?.ignoreBOM === true,
      fatal: options?.fatal === true,
    };
  }
}
