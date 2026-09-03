import { _Type } from "../_common/mod.mts";
import { Fallback } from "./fallback.mts";

export type _EncodeResult = {
  encodedBytes: _Type.Bytes;
  pendingText: string | null;
};

export type _EncodeFunc = (
  input: string,
  allowPending?: boolean,
) => _EncodeResult;

export type _EncoderInit = {
  name: string;
  fallback?: Fallback;
  // prependBom?: boolean;
  encode: _EncodeFunc;
};
