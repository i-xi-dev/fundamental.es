import * as _com from "../_common/mod.mts";
import { type _Decoder } from "./_decoder.mts";
import { type _DecoderStreamRegulator } from "./_decoder_stream_regulator.mts";

type _Controller = TransformStreamDefaultController<_com.Bytes>;

export abstract class _DecoderStreamBase
  extends TransformStream<string, _com.Bytes> {
  constructor(decoder: _Decoder, regulator: _DecoderStreamRegulator) {
    super({
      transform(text: string, controller: _Controller): void {
        try {
          const regulatedText = regulator.regulate(text);
          const decodedBytes = decoder.decode(regulatedText);
          controller.enqueue(decodedBytes);
        } catch (exception) {
          controller.error(exception);
        }
      },

      flush(controller: _Controller): void {
        try {
          const regulatedText = regulator.flush();
          if (regulatedText.length > 0) {
            const decodedBytes = decoder.decode(regulatedText);
            controller.enqueue(decodedBytes);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
    });
  }
}
