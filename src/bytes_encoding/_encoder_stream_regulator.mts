import { _Type } from "../_common/mod.mts";

export interface _EncoderStreamRegulator {
  regulate(bytes: _Type.Bytes): _Type.Bytes;
  flush(): _Type.Bytes;
}
