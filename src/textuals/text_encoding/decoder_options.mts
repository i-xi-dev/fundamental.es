export type DecoderOptions = {
  ignoreBom?: boolean;
  fatal?: boolean;
};

export namespace DecoderOptions {
  export function resolve(
    options?: DecoderOptions,
  ): Required<DecoderOptions> {
    return {
      ignoreBom: options?.ignoreBom === true,
      fatal: options?.fatal === true,
    };
  }
}
