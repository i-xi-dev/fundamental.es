import { type _DecoderStreamRegulator } from "../_decoder_stream_regulator.mts";

export class _HexDecoderStreamRegulator implements _DecoderStreamRegulator {
  #pending: string;

  constructor() {
    this.#pending = "";
  }

  regulate(text: string): string {
    const temp = this.#pending + text;
    const surplus = temp.length % 2;

    if (surplus === 0) {
      this.#pending = "";
      return temp;
    } else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.substring(pendingLength);
      return temp.substring(0, pendingLength);
    }
  }

  flush(): string {
    const remains = this.#pending;
    this.#pending = "";
    return remains;
  }
}
