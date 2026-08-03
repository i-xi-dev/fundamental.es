import type { _EncoderStreamRegulator } from "../_encoder_stream_regulator.mts";
import { _Type } from "../../_common/mod.mts";

export class _BinaryStringEncoderStreamRegulator
  implements _EncoderStreamRegulator {
  constructor() {
  }

  regulate(bytes: _Type.Bytes): _Type.Bytes {
    return bytes;
  }

  flush(): _Type.Bytes {
    return new Uint8Array(0);
  }
}
