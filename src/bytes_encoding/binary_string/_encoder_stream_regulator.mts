import * as _com from "../../_common/mod.mts";
import { type _EncoderStreamRegulator } from "../_encoder_stream_regulator.mts";

export class _BinaryStringEncoderStreamRegulator
  implements _EncoderStreamRegulator {
  constructor() {
  }

  regulate(bytes: _com.Bytes): _com.Bytes {
    return bytes;
  }

  flush(): _com.Bytes {
    return new Uint8Array(0);
  }
}
