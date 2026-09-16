import { _encode } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";
import { TypeAlias } from "../../type/mod.mts";

export class BinaryStringEncoder implements _Encoder {
  encode(bytes: TypeAlias.Bytes): string {
    return _encode(bytes);
  }
}
