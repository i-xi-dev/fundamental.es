import { _Type } from "../../_common/mod.mts";
import { Base64DecoderOptions } from "./decoder_options.mts";
import { Base64EncoderOptions } from "./encoder_options.mts";

export { Alphabet } from "./alphabet.mts";
export { Base64Decoder as Decoder } from "./decoder.mts";
export { Base64DecoderStream as DecoderStream } from "./decoder_stream.mts";
export { Base64Encoder as Encoder } from "./encoder.mts";
export { Base64EncoderStream as EncoderStream } from "./encoder_stream.mts";
export { LastChunkHandling } from "./last_chunk_handling.mts";
export type { Base64DecoderOptions as DecoderOptions };
export type { Base64EncoderOptions as EncoderOptions };

/** @deprecated Use `Uint8Array.fromBase64`. */
export function decode(
  text: string,
  options?: Base64DecoderOptions,
): _Type.Bytes {
  return Uint8Array.fromBase64(text, options);
}

/** @deprecated Use `Uint8Array.prototype.toBase64`. */
export function encode(
  bytes: _Type.Bytes,
  options?: Base64EncoderOptions,
): string {
  return bytes.toBase64(options);
}
