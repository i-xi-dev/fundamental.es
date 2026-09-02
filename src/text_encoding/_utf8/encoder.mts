import { _EncodeFunc } from "../_encoder_init.mts";
import { _EncoderBase } from "../_encoder_base.mts";
import { _Error } from "../../_common/mod.mts";
import { _NAME } from "./_common.mts";
import { EncoderOptions } from "../encoder_options.mts";
import { Fallback } from "../fallback.mts";

//TODO 外に出す
const _HIGH_SURROGATE = /^[u\D800-u\DBFF]$/;

function _regulate(text: string, allowPending?: boolean): {
  textToEncode: string;
  pendingText: string | null;
} {
  if ((allowPending === true) && (text.length > 0)) {
    const lastChar = text.at(-1)!;
    if (_HIGH_SURROGATE.test(lastChar) === true) {
      return {
        textToEncode: text.slice(0, -1),
        pendingText: lastChar,
      };
    }
  }

  return { textToEncode: text, pendingText: null };
}

function _createEncode(fatal?: boolean): _EncodeFunc {
  const encoder = new TextEncoder();

  return (input: string, allowPending?: boolean) => {
    const { textToEncode, pendingText } = _regulate(input, allowPending);

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

export class Utf8Encoder extends _EncoderBase {
  constructor(options?: EncoderOptions) {
    super({
      name: _NAME.toLowerCase(),
      fallback: (options?.fatal === true)
        ? Fallback.EXCEPTION
        : Fallback.REPLACEMENT,
      encode: _createEncode(options?.fatal),
    });
  }
}
