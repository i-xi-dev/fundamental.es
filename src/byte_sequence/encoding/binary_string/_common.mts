import { _Message, _T } from "../../../_common/mod.mts";

// deno-lint-ignore no-control-regex
const _regex = /^[\u0000-\u00FF]*$/;

export function _decode(text: string): _T.Bytes {
  if (_T.isString(text) !== true) {
    throw new TypeError(_Message.build("E10001"));
  }
  if (_regex.test(text) !== true) {
    throw new SyntaxError(_Message.build("E10009"));
  }

  return Uint8Array.from(text, (char) => char.charCodeAt(0)); // 第1引数はIterable<コードポイント単位>になるが、0xFF以上は弾いているので問題ない
}

export function _encode(bytes: _T.Bytes): string {
  if (_T.isNonSharedUint8Array(bytes) !== true) {
    throw new TypeError(_Message.build("E10002"));
  }

  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
}
