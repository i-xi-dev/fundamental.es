import * as _com from "../_common/mod.mts";

export interface _EncoderStreamRegulator {
  regulate(bytes: _com.Bytes): _com.Bytes;
  flush(): _com.Bytes;
}
