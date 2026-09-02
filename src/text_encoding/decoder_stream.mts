import { _Type } from "../_common/mod.mts";

export interface DecoderStream extends TransformStream<_Type.Bytes, string> {
  encoding: string;
  // fatal: boolean;
}
