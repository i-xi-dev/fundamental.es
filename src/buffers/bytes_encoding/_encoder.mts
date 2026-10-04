import * as TypeAlias from "../../_internal/type_alias/mod.mts";

export interface _Encoder {
  encode(bytes: TypeAlias.Bytes): string;
}
