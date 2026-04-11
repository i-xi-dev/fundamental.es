export { _Alphabet as Alphabet } from "./_alphabet.mts";
export { _Base64DecoderStream as DecoderStream } from "./_decoder_stream.mts";
export { _Base64EncoderStream as EncoderStream } from "./_encoder_stream.mts";
export { _LastChunkHandling as LastChunkHandling } from "./_last_chunk_handling.mts";
export type { _Base64DecoderOptions as DecoderOptions } from "./_decoder_options.mts";
export type { _Base64EncoderOptions as EncoderOptions } from "./_encoder_options.mts";

// decode静的メソッドとDecoderクラス は Uint8Array.fromBase64 で出来るので廃止
// encode静的メソッドとEncoderクラス は Uint8Array.prototype.toBase64 で出来るので廃止
