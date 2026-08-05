import { _Type } from "../_common/mod.mts";

export interface _Decoder {
  decode(bytes: _Type.Bytes): string;
}
