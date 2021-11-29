import { TransformStream } from "node:stream/web";
globalThis.TransformStream = TransformStream;

export {
  ByteDecoderStream,
  ByteEncoderStream,
  isUint8,
} from "../dist/index";
