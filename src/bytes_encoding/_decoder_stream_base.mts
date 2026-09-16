import type { _Decoder } from "./_decoder.mts";
import type { _DecoderStreamRegulator } from "./_decoder_stream_regulator.mts";
import { TypeAlias } from "../type/mod.mts";

type _Controller = TransformStreamDefaultController<TypeAlias.Bytes>;

export abstract class _DecoderStreamBase
  extends TransformStream<string, TypeAlias.Bytes> {
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
