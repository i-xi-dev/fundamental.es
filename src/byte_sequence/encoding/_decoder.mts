import { _T } from "../../_common/mod.mts";

export interface _Decoder {
  decode(text: string): _T.Bytes;
}
