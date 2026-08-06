import { _decode, _encode } from "./_common.mts";
import { _Type } from "../../_common/mod.mts";
import { Utf8DecoderOptions as DecoderOptions } from "./decoder_options.mts";
import { Utf8EncoderOptions as EncoderOptions } from "./encoder_options.mts";

export { Utf8Decoder as Decoder } from "./decoder.mts";
export { Utf8Encoder as Encoder } from "./encoder.mts";

export { DecoderOptions, EncoderOptions };

export function decode(
  bytes: _Type.Bytes,
  options?: DecoderOptions & TextDecodeOptions,
): string {
  const resolvedOptions = DecoderOptions.resolve(options);
  return _decode(bytes, resolvedOptions, { stream: options?.stream === true });
}

export function encode(
  text: string,
  options?: EncoderOptions,
): _Type.Bytes {
  const resolvedOptions = EncoderOptions.resolve(options);
  return _encode(text, resolvedOptions);
}
