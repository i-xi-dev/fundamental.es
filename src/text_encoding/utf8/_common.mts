import { _Error, _Type } from "../../_common/mod.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { EncoderOptions } from "../encoder_options.mts";

export const _NAME = "UTF-8";

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
  options: Required<DecoderOptions>,
  /* decodeOptions?: TextDecodeOptions, */
  decoder: TextDecoder = _getDecoder(options),
): string {
  return decoder.decode(bytes /* , decodeOptions */);
}

let _encoder: TextEncoder | null = null;
function _getEncoder(): TextEncoder {
  if (_encoder === null) {
    _encoder = new TextEncoder();
  }
  return _encoder;
}

export function _encode(
  text: string,
  options: Required<EncoderOptions>,
  encoder: TextEncoder = _getEncoder(),
): _Type.Bytes {
  if (options.fatal === true) {
    if (text.isWellFormed() !== true) {
      throw _Error.TextEncoding.encodingFailed(_NAME, "Input");
    }
  }

  if ((options.prependBOM === true) && (text.startsWith("\uFEFF") !== true)) {
    return encoder.encode("\uFEFF" + text);
  }
  return encoder.encode(text);
}
