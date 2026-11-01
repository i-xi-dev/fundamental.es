import { _assertChar16, _isChar16 } from "../_internal/common.mts";
import { _assertUint16 } from "../../numerics/_internal/common.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export { _isChar16 as is };

export { _assertChar16 as assert };

//TODO fromBytes
//     toBytes

export function fromUint16(charCode: TypeAlias.uint16): TypeAlias.char16 {
  _assertUint16(charCode, "Input");
  return String.fromCharCode(charCode); // as TypeAlias.char16;
}

export function toUint16(char: TypeAlias.char16): TypeAlias.uint16 {
  _assertChar16(char, "Input");
  return char.charCodeAt(0); // as TypeAlias.uint16;
}
