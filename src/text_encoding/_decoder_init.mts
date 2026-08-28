import { _Type } from "../_common/mod.mts";
import { Fallback } from "./fallback.mts";

export type _DecoderInit = {
  name: string;
  replacement: string;
  bomBytes: _Type.Bytes;
  fallback?: Fallback;
  ignoreBom?: boolean;
};
