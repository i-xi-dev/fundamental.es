import { TypeAlias } from "../type/mod.mts";

export interface _EncoderStreamRegulator {
  regulate(bytes: TypeAlias.Bytes): TypeAlias.Bytes;
  flush(): TypeAlias.Bytes;
}
