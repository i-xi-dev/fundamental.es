import { Fallback } from "./fallback.mts";
import { TypeAlias } from "../type/mod.mts";

export type _DecodeResult = {
  decodedText: string;
  pendingBytes: TypeAlias.Bytes | null;
};

export type _DecodeFunc = (
  input: TypeAlias.Bytes,
  allowPending?: boolean,
) => _DecodeResult;

export type _DecoderInit = {
  name: string;
  bomBytes: Readonly<TypeAlias.Bytes>;
  fallback?: Fallback;
  ignoreBom?: boolean;
  decode: _DecodeFunc;
};
