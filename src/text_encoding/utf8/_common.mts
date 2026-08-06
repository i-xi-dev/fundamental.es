import { _Error, _Type } from "../../_common/mod.mts";

export const _NAME = "UTF-8";

export type _Utf8DecoderOptions = {
  ignoreBOM?: boolean;
  fatal?: boolean;
};

export type _Utf8EncoderOptions = {
  prependBOM?: boolean;
  fatal?: boolean;
};

const _decoders = new Map<string, TextDecoder>();
function _getDecoder(options: Required<_Utf8DecoderOptions>): TextDecoder {
  const key = JSON.stringify(options);
  if (_decoders.has(key) !== true) {
    _decoders.set(key, new TextDecoder(_NAME, options));
  }
  return _decoders.get(key)!;
}

export function _decode(
  bytes: _Type.Bytes,
  options: Required<_Utf8DecoderOptions>,
  decodeOptions?: TextDecodeOptions,
  decoder: TextDecoder = _getDecoder(options),
): string {
  return decoder.decode(bytes, decodeOptions);
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
  options: Required<_Utf8EncoderOptions>,
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
