import { _Type } from "../../_common/mod.mts";

export interface _Decoder {
  decode(text: string): _Type.Bytes;
}
