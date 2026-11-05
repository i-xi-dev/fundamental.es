import {
  _assertChar16,
  _charsToBytes,
  _isChar16,
} from "../_internal/common.mts";
import { _assertUint16 } from "../../numerics/_internal/common.mts";
import { _TextualException } from "../_internal/error/mod.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

// 孤立サロゲートを許容するが、
// 孤立サロゲートはUTF-8符号化/復号 は出来ないので、fromBytes/toBytesでは孤立サロゲートはエラーになる

export { _isChar16 as is };

export { _assertChar16 as assert };

//TODO fromBytes

// // byteLengthは1～2になる
// export function toBytes(char: TypeAlias.char16): TypeAlias.Bytes {
//   _assertChar16(char, "Input");
//   if (char.isWellFormed() !== true) {
//     throw _TextualException.mustBeWellFormedString("Input");
//   }
//   return _charsToBytes(char);
// }

export function fromUint16(charCode: TypeAlias.uint16): TypeAlias.char16 {
  _assertUint16(charCode, "Input");
  return String.fromCharCode(charCode); // as TypeAlias.char16;
}

export function toUint16(char: TypeAlias.char16): TypeAlias.uint16 {
  _assertChar16(char, "Input");
  return char.charCodeAt(0); // as TypeAlias.uint16;
}
