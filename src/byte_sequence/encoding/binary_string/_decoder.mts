import { _decode } from "./_common.mts";
import { _Decoder } from "../_decoder.mts";
import { _T } from "../../../_common/mod.mts";

export class _BinaryStringDecoder implements _Decoder {
  decode(text: string): _T.Bytes {
    return _decode(text);
  }
}
