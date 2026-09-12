import { _DecodeResult } from "../_decoder_init.mts";
import { _EncodeResult } from "../_encoder_init.mts";
import { _Error, _Type, CodePoint } from "../../_common/mod.mts";
import { _regulateForEncoder } from "../_utf.mts";
import { TypeAlias } from "../../type/mod.mts";
import { Uint32 } from "../../numerics/uint.mts";

export const _BYTES_PER_RUNE = Uint32.BYTE_LENGTH;

export function _decodeShared(
  name: string,
  littleEndian: boolean,
  input: ArrayBuffer,
  fatal?: boolean,
  allowPending?: boolean,
): _DecodeResult {
  const srcView = new DataView(input);
  const dstRunes: Array<_Type.rune> = [];

  // let writtenRuneCount = 0;
  const p: Array<TypeAlias.safeint> = [];

  const srcByteCount = srcView.byteLength;
  const loopCount = (srcByteCount % _BYTES_PER_RUNE)
    ? (srcByteCount + _BYTES_PER_RUNE)
    : srcByteCount;
  for (let i = 0; i < loopCount; i += _BYTES_PER_RUNE) {
    let s = false;
    let uint32: number;
    if ((srcByteCount - i) < _BYTES_PER_RUNE) {
      if (allowPending === true) {
        for (let j = i; j < srcByteCount; j++) {
          p.push(srcView.getUint8(j));
        }
        break;
      } else {
        // 4バイトで割り切れない場合TextDecoder("utf-16xx")に合わせる
        if (fatal === true) {
          throw new TypeError(`decode-error: invalid data`); //TODO
        } else {
          // 端数バイトはU+FFFDにデコードする）
          s = true;
          uint32 = Number.NaN;
        }
      }
    } else {
      uint32 = srcView.getUint32(i, littleEndian);
    }

    if (_Type.isCodePoint(uint32)) {
      dstRunes.push(String.fromCodePoint(uint32));
      // writtenRuneCount += 1;
    } else {
      if (fatal === true) {
        throw new TypeError(
          `decode-error: 0x${uint32.toString(16)}`, //TODO
        );
      } else {
        dstRunes.push("\uFFFD");
        // writtenRuneCount += 1;
      }
    }

    if (s === true) {
      break;
    }
  }

  return {
    decodedText: dstRunes.join(""),
    pendingBytes: (p.length > 0) ? Uint8Array.from(p) : null,
  };
}

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
      dstView.setUint32(
        writtenByteCount,
        0xFFFD,
        littleEndian,
      );
      writtenByteCount += _BYTES_PER_RUNE;
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
