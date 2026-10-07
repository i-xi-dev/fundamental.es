import type { TypeAlias } from "../type_alias/mod.mts";
import { _Error } from "../../_common/mod.mts";

export const NAME = "UTF-8";

const _decoders = new Map<string, TextDecoder>();
function _getDecoder(fatal: boolean, ignoreBom: boolean): TextDecoder {
  const key = JSON.stringify({ fatal, ignoreBom });
  if (_decoders.has(key) !== true) {
    _decoders.set(
      key,
      new TextDecoder(NAME, {
        fatal,
        ignoreBOM: ignoreBom,
      }),
    );
  }
  return _decoders.get(key)!;
}

export function decode(
  bytes: TypeAlias.Bytes,
  fatal: boolean,
  ignoreBom: boolean,
): string {
  return _getDecoder(fatal, ignoreBom).decode(bytes);
}

let _encoder: TextEncoder | null = null;
function _getEncoder(): TextEncoder {
  if (_encoder === null) {
    _encoder = new TextEncoder();
  }
  return _encoder;
}

export function encode(
  text: string,
  fatal: boolean,
): TypeAlias.Bytes {
  if (fatal === true) {
    if (text.isWellFormed() !== true) {
      throw _Error.TextEncoding.encodingFailed(NAME, "Input");
    }
  }

  return _getEncoder().encode(text);
}
