import * as _InputError from "../../../_internal/_input_error.mts";
import { _T, StringUtils } from "../../../_common/mod.mts";

const { EMPTY } = StringUtils;

// deno-lint-ignore no-control-regex
const _regex = /^[\u0000-\u00FF]*$/;

export function _decode(text: string): _T.Bytes {
  _T.assertString(text, "Input");
  if (_regex.test(text) !== true) {
    throw _InputError.x_isomorphicString();
  }

  return Uint8Array.from(text, (char) => char.charCodeAt(0)); // 第1引数はIterable<コードポイント単位>になるが、0xFF以上は弾いているので問題ない
}

export function _encode(bytes: _T.Bytes): string {
  _T.assertNonSharedUint8Array(bytes, "Input");

  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join(EMPTY);
}
