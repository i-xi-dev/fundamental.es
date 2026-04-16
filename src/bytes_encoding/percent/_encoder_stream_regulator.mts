import type { _EncoderStreamRegulator } from "../_encoder_stream_regulator.mts";
import { _T } from "../../_common/mod.mts";

export class _PercentEncoderStreamRegulator implements _EncoderStreamRegulator {
  constructor() {
  }

  regulate(bytes: _T.Bytes): _T.Bytes {
    return bytes;
  }

  flush(): _T.Bytes {
    return new Uint8Array(0);
  }
}
