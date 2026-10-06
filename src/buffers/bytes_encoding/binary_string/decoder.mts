import type { TypeAlias } from "../../../_internal/type_alias/mod.mts";
import { _decode } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";

export class BinaryStringDecoder implements _Decoder {
  decode(text: string): TypeAlias.Bytes {
    return _decode(text);
  }
}
