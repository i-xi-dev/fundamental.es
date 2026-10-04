import * as TypeAlias from "../../../_internal/type_alias/mod.mts";
import { _encode } from "./_common.mts";
import { _Encoder } from "../_encoder.mts";

export class BinaryStringEncoder implements _Encoder {
  encode(bytes: TypeAlias.Bytes): string {
    return _encode(bytes);
  }
}
