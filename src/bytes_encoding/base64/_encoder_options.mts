import { _Alphabet } from "./_alphabet.mts";

// Uint8Array.toBase64のoptionsと互換にした
export type _Base64EncoderOptions = {
  alphabet?: _Alphabet;
  omitPadding?: boolean;
};

export namespace _Base64EncoderOptions {
  export function resolve(
    options?: _Base64EncoderOptions,
  ): Required<_Base64EncoderOptions> {
    return {
      alphabet:
        Object.values(_Alphabet).includes(options?.alphabet as _Alphabet)
          ? options!.alphabet!
          : _Alphabet.BASE64,
      omitPadding: options?.omitPadding === true,
    };
  }
}
