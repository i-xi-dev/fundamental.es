import { _encode } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";
import { _Type } from "../../../_common/mod.mts";

export class BinaryStringEncoder implements _Encoder {
  encode(bytes: _Type.Bytes): string {
    return _encode(bytes);
  }
}
