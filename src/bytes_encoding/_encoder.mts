import { TypeAlias } from "../type/mod.mts";

export interface _Encoder {
  encode(bytes: TypeAlias.Bytes): string;
}
