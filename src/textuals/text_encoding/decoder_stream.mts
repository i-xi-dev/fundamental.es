import * as TypeAlias from "../../type_alias/mod.mts";

export interface DecoderStream
  extends TransformStream<TypeAlias.Bytes, string> {
  encoding: string;
  // fatal: boolean;
}
