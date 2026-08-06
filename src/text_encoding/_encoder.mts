import { _Type } from "../_common/mod.mts";

export interface _Encoder {
  encoding: string;
  fatal: boolean;
  encode(text: string): _Type.Bytes;
}
