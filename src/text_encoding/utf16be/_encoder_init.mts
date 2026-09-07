import { _EncodeFunc, _EncoderInit } from "../_encoder_init.mts";
import { _encodeShared } from "../_utf16/_common.mts";
import { _NAME } from "./_common.mts";
import { EncoderOptions } from "../encoder_options.mts";
import { Fallback } from "../fallback.mts";

function _createEncode(fatal?: boolean): _EncodeFunc {
  return (input: string, allowPending?: boolean) => {
    return _encodeShared(_NAME, false, input, fatal, allowPending);
  };
}

export function _createEncoderInit(options?: EncoderOptions): _EncoderInit {
  return {
    name: _NAME.toLowerCase(),
    fallback: (options?.fatal === true)
      ? Fallback.EXCEPTION
      : Fallback.REPLACEMENT,
    encode: _createEncode(options?.fatal),
  };
}
