import type { TypeAlias } from "../../../_internal/type_alias/mod.mts";
import { _Error } from "../../../_common/mod.mts";
import { _Utf8 } from "../../../_internal/_utf8/mod.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { EncoderOptions } from "../encoder_options.mts";

export function _staticDecode(
  bytes: TypeAlias.Bytes,
  options?: DecoderOptions,
): string {
  const resolvedOptions = DecoderOptions.resolve(options);
  return _Utf8.decode(bytes, resolvedOptions.fatal, resolvedOptions.ignoreBom);
}

export function _staticEncode(
  text: string,
  options?: EncoderOptions,
): TypeAlias.Bytes {
  return _Utf8.encode(text, options?.fatal === true);
}
