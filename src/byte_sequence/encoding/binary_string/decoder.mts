import { _decode } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";
import { _Type } from "../../../_common/mod.mts";

export class BinaryStringDecoder implements _Decoder {
  decode(text: string): _Type.Bytes {
    return _decode(text);
  }
}
