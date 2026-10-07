import type { TypeAlias } from "../../../../_internal/type_alias/mod.mts";
import { /*_staticDecode,*/ _staticEncode } from "./_common.mts";
import { DecoderOptions } from "../../decoder_options.mts";
import { EncoderOptions } from "../../encoder_options.mts";
import { Type } from "../../../../type/mod.mts";

//export { Utf32LeDecoder as Decoder } from "./decoder.mts";
export { Utf32LeEncoder as Encoder } from "./encoder.mts";
//export { Utf32LeDecoderStream as DecoderStream } from "./decoder_stream.mts";
export { Utf32LeEncoderStream as EncoderStream } from "./encoder_stream.mts";

// export function decode(
//   bytes: TypeAlias.Bytes,
//   options?: DecoderOptions,
// ): string {
//   Type.assertNonSharedUint8Array(bytes, "Input");

//   return _staticDecode(bytes, options);
// }

export function encode(
  text: string,
  options?: EncoderOptions,
): TypeAlias.Bytes {
  Type.assertString(text, "Input");

  return _staticEncode(text, options);
}
