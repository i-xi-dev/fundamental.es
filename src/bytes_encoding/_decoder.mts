import { TypeAlias } from "../type/mod.mts";

export interface _Decoder {
  decode(text: string): TypeAlias.Bytes;
}
