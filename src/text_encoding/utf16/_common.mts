import { _EncodeResult } from "../_encoder_init.mts";
import { _Error, _Type, CodePoint, Rune } from "../../_common/mod.mts";

export const _BYTES_PER_CHAR = 2;

function _regulateForEncode(text: string, allowPending?: boolean): {
  textToEncode: string;
  pendingText: string | null;
} {
  if ((allowPending === true) && (text.length > 0)) {
    const lastChar = text.at(-1)!;
    if (Rune.isHighSurrogate(lastChar) === true) {
      return {
        textToEncode: text.slice(0, -1),
        pendingText: lastChar,
      };
    }
  }

  return { textToEncode: text, pendingText: null };
}

export function _encodeShared(
  name: string,
  littleEndian: boolean,
  input: string,
  fatal?: boolean,
  allowPending?: boolean,
): _EncodeResult {
  const { textToEncode, pendingText } = _regulateForEncode(input, allowPending);

  if (fatal === true) {
    if (textToEncode.isWellFormed() !== true) {
      throw _Error.TextEncoding.encodingFailed(name, "Input");
    }
  }

  const dstBuffer = new ArrayBuffer(textToEncode.length * _BYTES_PER_CHAR);
  const dstView = new DataView(dstBuffer);

  // let readCharCount = 0;
  let writtenByteCount = 0;

  const runes = [...textToEncode];
  const runeCount = runes.length;
  for (let i = 0; i < runeCount; i++) {
    const rune = runes[i];
    const codePoint = rune.codePointAt(0)!;

    // readCharCount += rune.length;

    if (CodePoint.isSurrogate(codePoint) === true) {
      // 孤立サロゲート

      if (fatal === true) {
        throw new TypeError(
          `TODO: ${codePoint}`,
        );
      } else {
        dstView.setUint16(
          writtenByteCount,
          0xFFFD,
          littleEndian,
        );
        writtenByteCount += _BYTES_PER_CHAR;
      }
    } else {
      for (let i = 0; i < rune.length; i++) {
        dstView.setUint16(
          writtenByteCount,
          rune.charCodeAt(i),
          littleEndian,
        );
        writtenByteCount += _BYTES_PER_CHAR;
      }
    }
  }

  return {
    encodedBytes: new Uint8Array(dstBuffer),
    pendingText,
  };
}
