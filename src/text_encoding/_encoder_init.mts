import { _Type } from "../_common/mod.mts";
import { Fallback } from "./fallback.mts";

export type _EncoderInit = {
  name: string;
  replacement: _Type.Bytes;
  fallback?: Fallback;
  prependBom?: boolean;
};
