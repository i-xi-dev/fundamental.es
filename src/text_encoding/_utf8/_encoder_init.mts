import { _EncodeFunc, _EncoderInit } from "../_encoder_init.mts";
import { _Error } from "../../_common/mod.mts";
import { _NAME } from "./_common.mts";
import { _regulateForEncoder } from "../_utf.mts";
import { EncoderOptions } from "../encoder_options.mts";
import { Fallback } from "../fallback.mts";

function _createEncode(fatal?: boolean): _EncodeFunc {
  const encoder = new TextEncoder();

  return (input: string, allowPending?: boolean) => {
    const {
      textToEncode,
      pendingText,
    } = _regulateForEncoder(input, allowPending);

    if (fatal === true) {
      if (textToEncode.isWellFormed() !== true) {
        throw _Error.TextEncoding.encodingFailed(_NAME, "Input");
      }
    }

    const encodedBytes = encoder.encode(textToEncode);

    return {
      encodedBytes,
      pendingText,
    };
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
