import { _Type } from "../_common/mod.mts";
import { Fallback } from "./fallback.mts";

export type _DecodeResult = {
  decodedText: string;
  pendingBytes: _Type.Bytes | null;
};

export type _DecodeFunc = (
  input: _Type.Bytes,
  allowPending?: boolean,
) => _DecodeResult;

export type _DecoderInit = {
  name: string;
  bomBytes: Readonly<_Type.Bytes>;
  fallback?: Fallback;
  ignoreBom?: boolean;
  decode: _DecodeFunc;
};
