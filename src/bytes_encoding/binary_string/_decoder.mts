import * as _com from "../../_common/mod.mts";
import { _decode } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";

export class _BinaryStringDecoder implements _Decoder {
  decode(text: string): _com.Bytes {
    return _decode(text);
  }
}
