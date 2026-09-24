import type { _DecoderStreamRegulator } from "../_decoder_stream_regulator.mts";
import { Text } from "../../textual/mod.mts";

export class _BinaryStringDecoderStreamRegulator
  implements _DecoderStreamRegulator {
  constructor() {
  }

  regulate(text: string): string {
    return text;
  }

  flush(): string {
    return Text.EMPTY;
  }
}
