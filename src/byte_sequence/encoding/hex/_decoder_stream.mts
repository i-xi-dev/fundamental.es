import { _DecoderStreamBase } from "../_decoder_stream_base.mts";
import { _HexDecoderStreamRegulator } from "./_decoder_stream_regulator.mts";

export class _HexDecoderStream extends _DecoderStreamBase {
  constructor() {
    super({
      decode: (text) => Uint8Array.fromHex(text),
    }, new _HexDecoderStreamRegulator());
  }
}
