import type { _EncoderStreamRegulator } from "../_encoder_stream_regulator.mts";
import { TypeAlias } from "../../type/mod.mts";

export class _HexEncoderStreamRegulator implements _EncoderStreamRegulator {
  constructor() {
  }

  regulate(bytes: TypeAlias.Bytes): TypeAlias.Bytes {
    return bytes;
  }

  flush(): TypeAlias.Bytes {
    return new Uint8Array(0);
  }
}
