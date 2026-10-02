import * as TypeAlias from "../../_internal/type_alias/mod.mts";
import { Fallback } from "./fallback.mts";

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
