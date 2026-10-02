import * as TypeAlias from "../../_internal/type_alias/mod.mts";
import { _Decoder } from "../_decoder.mts";

/** @deprecated Use `Uint8Array.fromHex`. */
export class HexDecoder implements _Decoder {
  /** @deprecated Use `Uint8Array.fromHex`. */
  decode(text: string): TypeAlias.Bytes {
    return Uint8Array.fromHex(text);
  }
}
