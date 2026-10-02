import * as TypeAlias from "../../type_alias/mod.mts";
import { Fallback } from "./fallback.mts";

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
