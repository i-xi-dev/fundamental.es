export type EncoderOptions = {
  fatal?: boolean;
};

export namespace EncoderOptions {
  export function resolve(options?: EncoderOptions): Required<EncoderOptions> {
    return {
      fatal: options?.fatal === true,
    };
  }
}
