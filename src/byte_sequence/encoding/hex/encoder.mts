import { _Encoder } from "../_encoder.mts";
import { _Type } from "../../../_common/mod.mts";

/** @deprecated Use `Uint8Array.prototype.toHex`. */
export class HexEncoder implements _Encoder {
  /** @deprecated Use `Uint8Array.prototype.toHex`. */
  encode(bytes: _Type.Bytes): string {
    return bytes.toHex();
  }
}
