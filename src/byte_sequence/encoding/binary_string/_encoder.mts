import { _encode } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";
import { _T } from "../../../_common/mod.mts";

export class _BinaryStringEncoder implements _Encoder {
  encode(bytes: _T.Bytes): string {
    return _encode(bytes);
  }
}
