import { _decode } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";
import { TypeAlias } from "../../type/mod.mts";

export class BinaryStringDecoder implements _Decoder {
  decode(text: string): TypeAlias.Bytes {
    return _decode(text);
  }
}
