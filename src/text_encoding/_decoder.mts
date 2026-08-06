import { _Type } from "../_common/mod.mts";

export interface _Decoder {
  encoding: string;
  fatal: boolean;
  decode(bytes: _Type.Bytes, options?: TextDecodeOptions): string;
}
