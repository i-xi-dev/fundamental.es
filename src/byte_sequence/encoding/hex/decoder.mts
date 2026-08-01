import { _Decoder } from "../_decoder.mts";
import { _Type } from "../../../_common/mod.mts";

/** @deprecated Use `Uint8Array.fromHex`. */
export class HexDecoder implements _Decoder {
  /** @deprecated Use `Uint8Array.fromHex`. */
  decode(text: string): _Type.Bytes {
    return Uint8Array.fromHex(text);
  }
}
