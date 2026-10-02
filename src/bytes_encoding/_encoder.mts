import * as TypeAlias from "../type_alias/mod.mts";

export interface _Encoder {
  encode(bytes: TypeAlias.Bytes): string;
}
