import { Alphabet } from "./alphabet.mts";

// Uint8Array.toBase64のoptionsと互換にした
export type Base64EncoderOptions = {
  alphabet?: Alphabet;
  omitPadding?: boolean;
};

export namespace Base64EncoderOptions {
  export function resolve(
    options?: Base64EncoderOptions,
  ): Required<Base64EncoderOptions> {
    return {
      alphabet: Object.values(Alphabet).includes(options?.alphabet as Alphabet)
        ? options!.alphabet!
        : Alphabet.BASE64,
      omitPadding: options?.omitPadding === true,
    };
  }
}
