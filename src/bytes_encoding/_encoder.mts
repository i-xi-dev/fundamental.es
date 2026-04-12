import { _T } from "../_common/mod.mts";

export interface _Encoder {
  encode(bytes: _T.Bytes): string;
}
