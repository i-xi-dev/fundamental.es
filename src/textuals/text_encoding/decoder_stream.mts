import type { TypeAlias } from "../../_internal/type_alias/mod.mts";

export interface DecoderStream
  extends TransformStream<TypeAlias.Bytes, string> {
  encoding: string;
  // fatal: boolean;
}
