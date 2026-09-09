import { _Error, _Type } from "../../../_common/mod.mts";
import { _encodeShared } from "../_common.mts";
import { DecoderOptions } from "../../decoder_options.mts";
import { EncoderOptions } from "../../encoder_options.mts";

export const _NAME = "UTF-16BE";

const _decoders = new Map<string, TextDecoder>();
function _getDecoder(options: Required<DecoderOptions>): TextDecoder {
  const key = JSON.stringify(options);
  if (_decoders.has(key) !== true) {
    _decoders.set(
      key,
      new TextDecoder(_NAME, {
        fatal: options.fatal,
        ignoreBOM: options.ignoreBom,
      }),
    );
  }
  return _decoders.get(key)!;
}

export function _staticDecode(
  bytes: _Type.Bytes,
  options?: DecoderOptions,
): string {
  const resolvedOptions = DecoderOptions.resolve(options);
  return _getDecoder(resolvedOptions).decode(bytes);
}

export function _staticEncode(
  text: string,
  options?: EncoderOptions,
): _Type.Bytes {
  const { encodedBytes } = _encodeShared(_NAME, false, text, options?.fatal);
  return encodedBytes;
}
