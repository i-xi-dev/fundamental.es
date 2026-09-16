import { TypeAlias } from "../type/mod.mts";

export interface EncoderStream
  extends TransformStream<string, TypeAlias.Bytes> {
  encoding: string;
  // fatal: boolean;
}
