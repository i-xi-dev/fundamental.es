export type EncoderOptions = {
  prependBOM?: boolean;
  fatal?: boolean;
};

export namespace EncoderOptions {
  export function resolve(
    options?: EncoderOptions,
  ): Required<EncoderOptions> {
    return {
      prependBOM: options?.prependBOM === true,
      fatal: options?.fatal === true,
    };
  }
}
