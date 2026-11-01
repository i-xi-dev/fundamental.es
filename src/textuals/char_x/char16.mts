import { _assertChar16, _isChar16 } from "../_internal/common.mts";
import { TypeAlias } from "../../_internal/type_alias/mod.mts";

export { _isChar16 as is };

export { _assertChar16 as assert };

//TODO fromBytes
//     toBytes
//TODO fromUint16

export function toUint16(char: TypeAlias.char16): TypeAlias.uint16 {
  _assertChar16(char, "Input");
  return char.charCodeAt(0); // as TypeAlias.uint16;
}
