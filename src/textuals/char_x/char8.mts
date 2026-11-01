import { _byteToChar8, _char8ToByte } from "../_internal/common.mts";
import { Type } from "../../mod.mts";

export * from "./_const8.mts";

export function fromByte(byte: /* Type.uint8 */ number): Type.char8 {
  Type.assertUint8(byte, "Input");
  return _byteToChar8(byte);
}

export function toByte(char: /* Type.char8 */ string): Type.uint8 {
  Type.assertChar8(char, "Input");
  return _char8ToByte(char);
}
