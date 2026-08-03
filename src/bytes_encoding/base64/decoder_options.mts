import { Alphabet } from "./alphabet.mts";
import { LastChunkHandling } from "./last_chunk_handling.mts";

// Uint8Array.fromBase64のoptionsと互換にした
export type Base64DecoderOptions = {
  alphabet?: Alphabet;
  lastChunkHandling?: LastChunkHandling;
};

export namespace Base64DecoderOptions {
  export function resolve(
    options?: Base64DecoderOptions,
  ): Required<Base64DecoderOptions> {
    return {
      alphabet: Object.values(Alphabet).includes(options?.alphabet as Alphabet)
        ? options!.alphabet!
        : Alphabet.BASE64,
      lastChunkHandling: Object.values(LastChunkHandling).includes(
          options?.lastChunkHandling as LastChunkHandling,
        )
        ? options!.lastChunkHandling!
        : LastChunkHandling.LOOSE,
    };
  }
}
