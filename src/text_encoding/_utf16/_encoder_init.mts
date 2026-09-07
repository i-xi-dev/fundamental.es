import { _EncodeFunc, _EncoderInit } from "../_encoder_init.mts";
import { _encodeShared } from "../_utf16/_common.mts";
import { EncoderOptions } from "../encoder_options.mts";
import { Fallback } from "../fallback.mts";

function _createEncode(
  name: string,
  littleEndian: boolean,
  fatal?: boolean,
): _EncodeFunc {
  return (input: string, allowPending?: boolean) => {
    return _encodeShared(name, littleEndian, input, fatal, allowPending);
  };
}

export function _createEncoderInit(
  name: string,
  littleEndian: boolean,
  options?: EncoderOptions,
): _EncoderInit {
  return {
    name: name.toLowerCase(),
    fallback: (options?.fatal === true)
      ? Fallback.EXCEPTION
      : Fallback.REPLACEMENT,
    encode: _createEncode(name, littleEndian, options?.fatal),
  };
}
