import * as _com from "../../_common/mod.mts";
import { type _EncoderStreamRegulator } from "../_encoder_stream_regulator.mts";

export class _Base64EncoderStreamRegulator implements _EncoderStreamRegulator {
  #pending: _com.Bytes;

  constructor() {
    this.#pending = new Uint8Array(0);
  }

  regulate(bytes: _com.Bytes): _com.Bytes {
    const temp = new Uint8Array(this.#pending.length + bytes.length);
    temp.set(this.#pending);
    temp.set(bytes, this.#pending.length);
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return new Uint8Array(0);
    } else if (surplus === 0) {
      this.#pending = new Uint8Array(0);
      return temp;
    } else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.subarray(pendingLength);
      return temp.subarray(0, pendingLength);
    }
  }

  flush(): _com.Bytes {
    const remains = this.#pending;
    this.#pending = new Uint8Array(0);
    return remains;
  }
}
