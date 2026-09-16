import { _Encoder } from "../_encoder.mts";
import { TypeAlias } from "../../type/mod.mts";

/** @deprecated Use `Uint8Array.prototype.toHex`. */
export class HexEncoder implements _Encoder {
  /** @deprecated Use `Uint8Array.prototype.toHex`. */
  encode(bytes: TypeAlias.Bytes): string {
    return bytes.toHex();
  }
}
