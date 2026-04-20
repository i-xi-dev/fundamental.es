import { _T } from "../../_common/mod.mts";

export interface _EncoderStreamRegulator {
  regulate(bytes: _T.Bytes): _T.Bytes;
  flush(): _T.Bytes;
}
