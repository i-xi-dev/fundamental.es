import { _Error, _Type } from "../../_common/mod.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { EncoderOptions } from "../encoder_options.mts";

export const _NAME = "UTF-16BE";

export const _BYTES_PER_CHAR = 2;

const _decoders = new Map<string, TextDecoder>();
function _getDecoder(options: Required<DecoderOptions>): TextDecoder {
  const key = JSON.stringify(options);
  if (_decoders.has(key) !== true) {
    _decoders.set(key, new TextDecoder(_NAME, options));
  }
  return _decoders.get(key)!;
}

export function _decode(
  bytes: _Type.Bytes,
  options?: DecoderOptions,
): string {
  const resolvedOptions = DecoderOptions.resolve(options);
  return _getDecoder(resolvedOptions).decode(bytes);
}

//TODO
// let _encoder: TextEncoder | null = null;
// function _getEncoder(): TextEncoder {
//   if (_encoder === null) {
//     _encoder = new TextEncoder();
//   }
//   return _encoder;
// }

// export function _encode(
//   text: string,
//   options?: EncoderOptions,
// ): _Type.Bytes {
//   if (options?.fatal === true) {
//     if (text.isWellFormed() !== true) {
//       throw _Error.TextEncoding.encodingFailed(_NAME, "Input");
//     }
//   }

//   return _getEncoder().encode(text);
// }
