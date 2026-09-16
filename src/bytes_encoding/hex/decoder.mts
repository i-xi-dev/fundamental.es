import { _Decoder } from "../_decoder.mts";
import { TypeAlias } from "../../type/mod.mts";

/** @deprecated Use `Uint8Array.fromHex`. */
export class HexDecoder implements _Decoder {
  /** @deprecated Use `Uint8Array.fromHex`. */
  decode(text: string): TypeAlias.Bytes {
    return Uint8Array.fromHex(text);
  }
}
