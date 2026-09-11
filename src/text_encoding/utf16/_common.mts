import { _EncodeResult } from "../_encoder_init.mts";
import { _Error, _Type, CodePoint } from "../../_common/mod.mts";
import { _regulateForEncoder } from "../_utf.mts";
import { Uint16 } from "../../numerics/uint.mts";

export const _BYTES_PER_CHAR = Uint16.BYTE_LENGTH;

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

  const dstBuffer = new ArrayBuffer(textToEncode.length * _BYTES_PER_CHAR);
  const dstView = new DataView(dstBuffer);

  let writtenByteCount = 0;

  const runes = [...textToEncode];
  const runeCount = runes.length;
  for (let i = 0; i < runeCount; i++) {
    const rune = runes[i];
    const codePoint = rune.codePointAt(0)!;

    if (CodePoint.isSurrogate(codePoint) === true) {
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
