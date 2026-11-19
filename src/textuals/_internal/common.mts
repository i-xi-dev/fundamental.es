//削除
import type { _char8 } from "../_/_type/_def/_char8.mts";
import type { _uint8 } from "../../numerics/_/_type/_def/_uint8.mts";

export function _byteToChar8(byte: _uint8): _char8 {
  return String.fromCharCode(byte) as _char8;
}

export function _char8ToByte(char: _char8): _uint8 {
  return char.charCodeAt(0) as _uint8;
}
