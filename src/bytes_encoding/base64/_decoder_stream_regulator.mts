import type { _DecoderStreamRegulator } from "../_decoder_stream_regulator.mts";
import { Text } from "../../textual/mod.mts";

export class _Base64DecoderStreamRegulator implements _DecoderStreamRegulator {
  #pending: string;

  constructor() {
    this.#pending = Text.EMPTY;
  }

  regulate(text: string): string {
    const temp = this.#pending + text;
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return Text.EMPTY;
    } else if (surplus === 0) {
      this.#pending = Text.EMPTY;
      return temp;
    } else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.substring(pendingLength);
      return temp.substring(0, pendingLength);
    }
  }

  flush(): string {
    const remains = this.#pending;
    this.#pending = Text.EMPTY;
    return remains;
  }
}
