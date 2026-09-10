import { _EncodeResult } from "../_encoder_init.mts";
import { _Error, _Type, CodePoint } from "../../_common/mod.mts";
import { _regulateForEncoder } from "../_utf.mts";

export const _BYTES_PER_RUNE = 4;

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
      throw _Error.TextEncoding.encodingFailed(name, "Input");
    }
  }

  const runes = [...textToEncode];
  const runeCount = runes.length;

  const dstBuffer = new ArrayBuffer(runeCount * _BYTES_PER_RUNE);
  const dstView = new DataView(dstBuffer);

  let writtenByteCount = 0;

  for (let i = 0; i < runeCount; i++) {
    const rune = runes[i];
    const codePoint = rune.codePointAt(0)!;

    if (CodePoint.isSurrogate(codePoint) === true) {
      // 孤立サロゲート

      if (fatal === true) {
        throw new TypeError(
          `TODO: ${codePoint}`,
        );
      } else {
        dstView.setUint32(
          writtenByteCount,
          0xFFFD,
          littleEndian,
        );
        writtenByteCount += _BYTES_PER_RUNE;
      }
    } else {
      dstView.setUint32(
        writtenByteCount,
        codePoint,
        littleEndian,
      );
      writtenByteCount += _BYTES_PER_RUNE;
    }
  }

  return {
    encodedBytes: new Uint8Array(dstBuffer),
    pendingText,
  };
}
