import { StringUtils } from "../../../_common/mod.mts";
import type { _DecoderStreamRegulator } from "../_decoder_stream_regulator.mts";

const { EMPTY } = StringUtils;

export class _BinaryStringDecoderStreamRegulator
  implements _DecoderStreamRegulator {
  constructor() {
  }

  regulate(text: string): string {
    return text;
  }

  flush(): string {
    return EMPTY;
  }
}
