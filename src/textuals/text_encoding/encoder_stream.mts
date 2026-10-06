import type { TypeAlias } from "../../_internal/type_alias/mod.mts";

export interface EncoderStream
  extends TransformStream<string, TypeAlias.Bytes> {
  encoding: string;
  // fatal: boolean;
}
