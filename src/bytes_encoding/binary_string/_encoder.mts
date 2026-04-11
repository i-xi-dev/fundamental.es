import * as _com from "../../_common/mod.mts";
import { _encode } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";

export class _BinaryStringEncoder implements _Encoder {
  encode(bytes: _com.Bytes): string {
    return _encode(bytes);
  }
}
