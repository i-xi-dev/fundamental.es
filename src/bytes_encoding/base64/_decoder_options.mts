import { _Alphabet } from "./_alphabet.mts";
import { _LastChunkHandling } from "./_last_chunk_handling.mts";

// Uint8Array.fromBase64のoptionsと互換にした
export type _Base64DecoderOptions = {
  alphabet?: _Alphabet;
  lastChunkHandling?: _LastChunkHandling;
};

export namespace _Base64DecoderOptions {
  export function resolve(
    options?: _Base64DecoderOptions,
  ): Required<_Base64DecoderOptions> {
    return {
      alphabet:
        Object.values(_Alphabet).includes(options?.alphabet as _Alphabet)
          ? options!.alphabet!
          : _Alphabet.BASE64,
      lastChunkHandling: Object.values(_LastChunkHandling).includes(
          options?.lastChunkHandling as _LastChunkHandling,
        )
        ? options!.lastChunkHandling!
        : _LastChunkHandling.LOOSE,
    };
  }
}
