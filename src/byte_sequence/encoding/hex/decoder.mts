import { _Decoder } from "../_decoder.mts";
import { _T } from "../../../_common/mod.mts";

/** @deprecated Use `Uint8Array.fromHex`. */
export class HexDecoder implements _Decoder {
  /** @deprecated Use `Uint8Array.fromHex`. */
  decode(text: string): _T.Bytes {
    return Uint8Array.fromHex(text);
  }
}
