import { _Assert, _Error, _Type, StringUtils } from "../../../_common/mod.mts";

const { EMPTY } = StringUtils;

// deno-lint-ignore no-control-regex
const _regex = /^[\u0000-\u00FF]*$/; //XXX 共通assertにする

export function _decode(text: string): _Type.Bytes {
  _Assert.string(text, "Input");
  if (_regex.test(text) !== true) {
    throw _Error.Syntax.latin1("Input");
  }

  return Uint8Array.from(text, (char) => char.charCodeAt(0)); // 第1引数はIterable<コードポイント単位>になるが、0xFF以上は弾いているので問題ない
}

export function _encode(bytes: _Type.Bytes): string {
  _Assert.nonSharedUint8Array(bytes, "Input");

  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join(EMPTY);
}
