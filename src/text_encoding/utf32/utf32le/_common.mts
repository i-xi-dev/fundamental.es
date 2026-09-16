import { _Error } from "../../../_common/mod.mts";
import { _encodeShared } from "../_common.mts";
import { DecoderOptions } from "../../decoder_options.mts";
import { EncoderOptions } from "../../encoder_options.mts";
import { TypeAlias } from "../../../type/mod.mts";

export const _NAME = "UTF-32LE";

//TODO
// export function _staticDecode(
//   bytes: TypeAlias.Bytes,
//   options?: DecoderOptions,
// ): string {
//   const resolvedOptions = DecoderOptions.resolve(options);
//   return _getDecoder(resolvedOptions).decode(bytes);
// }

export function _staticEncode(
  text: string,
  options?: EncoderOptions,
): TypeAlias.Bytes {
  const { encodedBytes } = _encodeShared(_NAME, true, text, options?.fatal);
  return encodedBytes;
}
