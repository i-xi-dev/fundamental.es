import { _EncodeResult } from "../_encoder_init.mts";
import { _regulateForEncoder } from "../_common.mts";
import { CodePointRange } from "../../code_point_range/mod.mts";
import { EncodingError } from "../error/mod.mts";

export const _BYTES_PER_CHAR = 2; // === Uint16.BYTE_LENGTH;

export function _encodeShared(
  name: string,
  littleEndian: boolean,
  input: string,
  fatal?: boolean,
  allowPending?: boolean,
): _EncodeResult {
  const {
    textToEncode,
    pendingText,
  } = _regulateForEncoder(input, allowPending);

  if (fatal === true) {
    if (textToEncode.isWellFormed() !== true) {
      throw EncodingError.encodingFailed(name, "Input");
    }
  }

  const dstBuffer = new ArrayBuffer(textToEncode.length * _BYTES_PER_CHAR);
  const dstView = new DataView(dstBuffer);

  let writtenByteCount = 0;

  const runes = [...textToEncode];
  const runeCount = runes.length;
  for (let i = 0; i < runeCount; i++) {
    const rune = runes[i];
    const codePoint = rune.codePointAt(0)!;

    if (CodePointRange.SURROGATES.contains(codePoint) === true) {
      // 孤立サロゲート
      dstView.setUint16(
        writtenByteCount,
        0xFFFD,
        littleEndian,
      );
      writtenByteCount += _BYTES_PER_CHAR;
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
