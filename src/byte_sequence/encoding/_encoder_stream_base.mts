import type { _Encoder } from "./_encoder.mts";
import type { _EncoderStreamRegulator } from "./_encoder_stream_regulator.mts";
import { _Type } from "../../_common/mod.mts";

type _Controller = TransformStreamDefaultController<string>;

export abstract class _EncoderStreamBase
  extends TransformStream<_Type.Bytes, string> {
  constructor(encoder: _Encoder, regulator: _EncoderStreamRegulator) {
    super({
      transform(bytes: _Type.Bytes, controller: _Controller): void {
        try {
          const regulatedBytes = regulator.regulate(bytes);
          const encodedText = encoder.encode(regulatedBytes);
          controller.enqueue(encodedText);
        } catch (exception) {
          controller.error(exception);
        }
      },

      flush(controller: _Controller): void {
        try {
          const regulatedBytes = regulator.flush();
          if (regulatedBytes.length > 0) {
            const encodedText = encoder.encode(regulatedBytes);
            controller.enqueue(encodedText);
          }
        } catch (exception) {
          controller.error(exception);
        }
      },
    });
  }
}
