import * as TypeAlias from "../type_alias/mod.mts";

export interface _Decoder {
  decode(text: string): TypeAlias.Bytes;
}
