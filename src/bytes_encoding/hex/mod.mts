import { TypeAlias } from "../../type/mod.mts";

export { HexDecoder as Decoder } from "./decoder.mts";
export { HexDecoderStream as DecoderStream } from "./decoder_stream.mts";
export { HexEncoder as Encoder } from "./encoder.mts";
export { HexEncoderStream as EncoderStream } from "./encoder_stream.mts";

/** @deprecated Use `Uint8Array.fromHex`. */
export function decode(text: string): TypeAlias.Bytes {
  return Uint8Array.fromHex(text);
}

/** @deprecated Use `Uint8Array.prototype.toHex`. */
export function encode(bytes: TypeAlias.Bytes): string {
  return bytes.toHex();
}
