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
  return _getDecoder(fatal, ignoreBom).decode(bytes); //TODO TextDecoderはfatalに関係なく孤立サロゲートはU+FFFDに置換されるので、fatal=trueの時は孤立サロゲートが含まれていないかチェックする必要がある
}

export function _encodingFailed(
  encodingName: string,
  target: string,
): TypeError {
  const msg =
    `${target} must be a string that can be encoded in ${encodingName}`;
  return new TypeError(msg);
}
