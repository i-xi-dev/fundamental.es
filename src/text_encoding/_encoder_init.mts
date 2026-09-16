import { Fallback } from "./fallback.mts";
import { TypeAlias } from "../type/mod.mts";

export type _EncodeResult = {
  encodedBytes: TypeAlias.Bytes;
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
