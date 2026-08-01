import { _Type } from "../../_common/mod.mts";

export interface _Encoder {
  encode(bytes: _Type.Bytes): string;
}
