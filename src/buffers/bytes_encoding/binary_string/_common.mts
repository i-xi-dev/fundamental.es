import type { _char8 } from "../../../textuals/_type/_def/_char8.mts";
import type { TypeAlias } from "../../../_internal/type_alias/mod.mts";
import {
  _byteToChar8,
  _char8ToByte,
} from "../../../textuals/_internal/common.mts";
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

  return Uint8Array.from(text, (char) => _char8ToByte(char as _char8)); // 第1引数はIterable<コードポイント単位>になるが、0xFF以上は弾いているので問題ない
}

export function _encode(bytes: TypeAlias.Bytes): string {
  Type.assertNonSharedUint8Array(bytes, "Input");

  return Array.from(bytes, (byte) => _byteToChar8(byte as Type.uint8)).join(
    Text.EMPTY,
  );
}
