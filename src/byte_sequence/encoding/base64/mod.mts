import { _T } from "../../../_common/mod.mts";
import { _Base64DecoderOptions } from "./_decoder_options.mts";
import { _Base64EncoderOptions } from "./_encoder_options.mts";

export { _Alphabet as Alphabet } from "./_alphabet.mts";
export { _Base64Decoder as Decoder } from "./_decoder.mts";
export { _Base64DecoderStream as DecoderStream } from "./_decoder_stream.mts";
export { _Base64Encoder as Encoder } from "./_encoder.mts";
export { _Base64EncoderStream as EncoderStream } from "./_encoder_stream.mts";
export { _LastChunkHandling as LastChunkHandling } from "./_last_chunk_handling.mts";
export type { _Base64DecoderOptions as DecoderOptions };
export type { _Base64EncoderOptions as EncoderOptions };

/** @deprecated Use `Uint8Array.fromBase64`. */
export function decode(
  text: string,
  options?: _Base64DecoderOptions,
): _T.Bytes {
  return Uint8Array.fromBase64(text, options);
}

/** @deprecated Use `Uint8Array.prototype.toBase64`. */
export function encode(
  bytes: _T.Bytes,
  options?: _Base64EncoderOptions,
): string {
  return bytes.toBase64(options);
}
