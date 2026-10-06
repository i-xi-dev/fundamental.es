import type { _EncoderStreamRegulator } from "../_encoder_stream_regulator.mts";
import type { TypeAlias } from "../../../_internal/type_alias/mod.mts";

export class _PercentEncoderStreamRegulator implements _EncoderStreamRegulator {
  constructor() {
  }

  regulate(bytes: TypeAlias.Bytes): TypeAlias.Bytes {
    return bytes;
  }

  flush(): TypeAlias.Bytes {
    return new Uint8Array(0);
  }
}
