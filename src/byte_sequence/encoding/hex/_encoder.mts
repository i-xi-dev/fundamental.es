import { _Encoder } from "../_encoder.mts";
import { _T } from "../../../_common/mod.mts";

/** @deprecated Use `Uint8Array.prototype.toHex`. */
export class _HexEncoder implements _Encoder {
  /** @deprecated Use `Uint8Array.prototype.toHex`. */
  encode(bytes: _T.Bytes): string {
    return bytes.toHex();
  }
}
