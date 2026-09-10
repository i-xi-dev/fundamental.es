import { _Error, _Type } from "../../../_common/mod.mts";
import { _encodeShared } from "../_common.mts";
import { DecoderOptions } from "../../decoder_options.mts";
import { EncoderOptions } from "../../encoder_options.mts";

export const _NAME = "UTF-32LE";

//TODO
// export function _staticDecode(
//   bytes: _Type.Bytes,
//   options?: DecoderOptions,
// ): string {
//   const resolvedOptions = DecoderOptions.resolve(options);
//   return _getDecoder(resolvedOptions).decode(bytes);
// }

export function _staticEncode(
  text: string,
  options?: EncoderOptions,
): _Type.Bytes {
  const { encodedBytes } = _encodeShared(_NAME, true, text, options?.fatal);
  return encodedBytes;
}
