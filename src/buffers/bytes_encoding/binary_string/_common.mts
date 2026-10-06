import type { TypeAlias } from "../../../_internal/type_alias/mod.mts";
import { _Error } from "../../../_common/mod.mts";
import { Text } from "../../../textuals/mod.mts";
import { Type } from "../../../type/mod.mts";

// deno-lint-ignore no-control-regex
const _regex = /^[\u0000-\u00FF]*$/; //XXX 共通assertにする

export function _decode(text: string): TypeAlias.Bytes {
  Type.assertString(text, "Input");
  if (_regex.test(text) !== true) {
    throw _Error.Syntax.mustBeBinaryString("Input");
  }

  return Uint8Array.from(text, (char) => char.charCodeAt(0)); // 第1引数はIterable<コードポイント単位>になるが、0xFF以上は弾いているので問題ない
}

export function _encode(bytes: TypeAlias.Bytes): string {
  Type.assertNonSharedUint8Array(bytes, "Input");

  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join(
    Text.EMPTY,
  );
}
