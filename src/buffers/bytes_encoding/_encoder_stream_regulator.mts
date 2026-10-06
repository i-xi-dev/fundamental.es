import type { TypeAlias } from "../../_internal/type_alias/mod.mts";

export interface _EncoderStreamRegulator {
  regulate(bytes: TypeAlias.Bytes): TypeAlias.Bytes;
  flush(): TypeAlias.Bytes;
}
