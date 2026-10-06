import type { TypeAlias } from "../../_internal/type_alias/mod.mts";

export interface _Decoder {
  decode(text: string): TypeAlias.Bytes;
}
