import type { _char8 } from "../_/_type/_def/_char8.mts";
import type { _uint8 } from "../../numerics/_/_type/_def/_uint8.mts";
import { _assertChar8 } from "../_/_type/_char8.mts";
import { _byteToChar8, _char8ToByte } from "../_internal/common.mts";
import { Type } from "../../mod.mts";

export * from "./_const8.mts";

export function fromByte(byte: /* _uint8 */ number): _char8 {
  Type.assertUint8(byte, "Input");
  return _byteToChar8(byte);
}

export function toByte(char: /* _char8 */ string): _uint8 {
  _assertChar8(char, "Input");
  return _char8ToByte(char);
}
