import { _T } from "../../../_common/mod.mts";

export { _HexDecoder as Decoder } from "./_decoder.mts";
export { _HexDecoderStream as DecoderStream } from "./_decoder_stream.mts";
export { _HexEncoder as Encoder } from "./_encoder.mts";
export { _HexEncoderStream as EncoderStream } from "./_encoder_stream.mts";

/** @deprecated Use `Uint8Array.fromHex`. */
export function decode(text: string): _T.Bytes {
  return Uint8Array.fromHex(text);
}

/** @deprecated Use `Uint8Array.prototype.toHex`. */
export function encode(bytes: _T.Bytes): string {
  return bytes.toHex();
}
