import { StringUtils } from "../../../_common/mod.mts";
import type { _DecoderStreamRegulator } from "../_decoder_stream_regulator.mts";

const { EMPTY } = StringUtils;

export class _PercentDecoderStreamRegulator implements _DecoderStreamRegulator {
  #pending: string;

  constructor() {
    this.#pending = EMPTY;
  }

  regulate(text: string): string {
    const temp = this.#pending + text;
    const lastIdx = temp.lastIndexOf("%");

    if (lastIdx >= (temp.length - 2)) {
      this.#pending = temp.substring(lastIdx);
      return temp.substring(0, lastIdx);
    } else {
      this.#pending = EMPTY;
      return temp;
    }
  }

  flush(): string {
    const remains = this.#pending;
    this.#pending = EMPTY;
    return remains;
  }
}
