import { TypeAlias } from "../type/mod.mts";

export interface DecoderStream
  extends TransformStream<TypeAlias.Bytes, string> {
  encoding: string;
  // fatal: boolean;
}
