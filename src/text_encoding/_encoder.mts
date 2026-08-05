import { _Type } from "../_common/mod.mts";

export interface _Encoder {
  encode(text: string): _Type.Bytes;
}
