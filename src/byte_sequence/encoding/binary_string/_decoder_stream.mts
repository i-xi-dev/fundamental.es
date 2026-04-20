import { _BinaryStringDecoderStreamRegulator } from "./_decoder_stream_regulator.mts";
import { _decode } from "./_common.mts";
import { _DecoderStreamBase } from "../_decoder_stream_base.mts";

export class _BinaryStringDecoderStream extends _DecoderStreamBase {
  constructor() {
    super({
      decode: (text) => _decode(text),
    }, new _BinaryStringDecoderStreamRegulator());
  }
}
