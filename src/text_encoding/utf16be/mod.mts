import { _Assert, _Type } from "../../_common/mod.mts";
import { _decode /*, _encode */ } from "./_common.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { EncoderOptions } from "../encoder_options.mts";

export { Utf16BeDecoder as Decoder } from "./decoder.mts";
// export { Utf16BeEncoder as Encoder } from "./encoder.mts";
// export { Utf16BeDecoderStream as DecoderStream } from "./decoder_stream.mts";
// export { Utf16BeEncoderStream as EncoderStream } from "./encoder_stream.mts";

export function decode(
  bytes: _Type.Bytes,
  options?: DecoderOptions,
): string {
  _Assert.nonSharedUint8Array(bytes, "Input");

  return _decode(bytes, options);
}

// export function encode(
//   text: string,
//   options?: EncoderOptions,
// ): _Type.Bytes {
//   _Assert.string(text, "Input");

//   return _encode(text, options);
// }
