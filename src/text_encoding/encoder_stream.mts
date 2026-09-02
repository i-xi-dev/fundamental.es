import { _Type } from "../_common/mod.mts";

export interface EncoderStream extends TransformStream<string, _Type.Bytes> {
  encoding: string;
  // fatal: boolean;
}
