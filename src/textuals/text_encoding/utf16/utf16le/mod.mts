import * as Type from "../../../../type/mod.mts";
import * as TypeAlias from "../../../../_internal/type_alias/mod.mts";
import { _staticDecode, _staticEncode } from "./_common.mts";
import { DecoderOptions } from "../../decoder_options.mts";
import { EncoderOptions } from "../../encoder_options.mts";

export { Utf16LeDecoder as Decoder } from "./decoder.mts";
export { Utf16LeEncoder as Encoder } from "./encoder.mts";
export { Utf16LeDecoderStream as DecoderStream } from "./decoder_stream.mts";
export { Utf16LeEncoderStream as EncoderStream } from "./encoder_stream.mts";

export function decode(
  bytes: TypeAlias.Bytes,
  options?: DecoderOptions,
): string {
  Type.Assert.nonSharedUint8Array(bytes, "Input");

  return _staticDecode(bytes, options);
}

export function encode(
  text: string,
  options?: EncoderOptions,
): TypeAlias.Bytes {
  Type.Assert.string(text, "Input");

  return _staticEncode(text, options);
}
