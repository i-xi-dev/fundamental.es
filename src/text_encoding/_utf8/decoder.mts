import { _DecodeFunc } from "../_decoder_init.mts";
import { _DecoderBase } from "../_decoder_base.mts";
import { _NAME } from "./_common.mts";
import { _Type } from "../../_common/mod.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { Fallback } from "../fallback.mts";

// 2～4バイト文字の1バイト目か
function _is1OfMulti(byte: number): boolean {
  return (byte >= 0xC2) && (byte <= 0xF4);
}

// // 2バイト文字の1バイト目か
// function _is1Of2(byte: number): boolean {
//   return (byte >= 0xC2) && (byte <= 0xDF);
// }

// 3バイト文字の1バイト目か
function _is1Of3(byte: number): boolean {
  return (byte >= 0xE0) && (byte <= 0xEF);
}

// 4バイト文字の1バイト目か
function _is1Of4(byte: number): boolean {
  return (byte >= 0xF0) && (byte <= 0xF4);
}

// 2～4バイト文字の1バイト目以外か
function _isXOfMulti(byte: number): boolean {
  return (byte >= 0x80) && (byte <= 0xBF);
}

function _regulate(bytes: _Type.Bytes, allowPending?: boolean): {
  bytesToDecode: _Type.Bytes;
  pendingBytes: _Type.Bytes | null;
} {
  if ((allowPending === true) && (bytes.length > 0)) {
    const lastByte = bytes.at(-1)!;
    if (_is1OfMulti(lastByte) === true) {
      // 終端が2バイト文字1バイト目、または、終端が3バイト文字1バイト目、または、終端が4バイト文字1バイト目
      // の場合、分断されているとみなす。断片は末尾1バイト
      return {
        bytesToDecode: bytes.subarray(0, -1), //TODO subarrayで問題ないんだっけ？（bufferは変わってないけど）
        pendingBytes: Uint8Array.of(lastByte),
      };
    }

    if (_isXOfMulti(lastByte) === true) {
      if (bytes.length > 1) {
        const last2Byte = bytes.at(-2)!;
        if (_is1Of3(last2Byte) || _is1Of4(last2Byte)) {
          // 1つ前のbyteが、3バイト文字1バイト目の場合、または、4バイト文字1バイト目の場合
          // 分断されているとみなす。断片は末尾2バイト
          return {
            bytesToDecode: bytes.subarray(0, -2),
            pendingBytes: Uint8Array.of(last2Byte, lastByte),
          };
        } else if (_isXOfMulti(last2Byte) === true) {
          if (bytes.length > 2) {
            const last3Byte = bytes.at(-3)!;
            if (_is1Of4(last3Byte) === true) {
              // 1つ前のbyteが、4バイト文字2バイト目以降、かつ、2つ前のbyteが、4バイト文字1バイト目の場合
              // 分断されているとみなす。断片は末尾3バイト
              return {
                bytesToDecode: bytes.subarray(0, -3),
                pendingBytes: Uint8Array.of(last3Byte, last2Byte, lastByte),
              };
            }
          }
        }
        // 1つ前のbyteが、2バイト文字1バイト目の場合は、分断されていないとみなす
        // 上記以外の場合（エラーの場合）も分断されていないとみなし、エラーはTextDecoderに処理させる
      }
    }
  }

  // 分断を検知しなかった場合はそのまま返す
  // エラーの並びだった場合や孤立サロゲートはここで考慮する必要は無い（TextDecoderに処理させる）
  return {
    bytesToDecode: bytes,
    pendingBytes: null,
  };
}

function _createDecode(fatal?: boolean): _DecodeFunc {
  const decoder = new TextDecoder(_NAME, {
    fatal: fatal === true,
    ignoreBOM: true,
  });

  return (input: _Type.Bytes, allowPending?: boolean) => {
    const { bytesToDecode, pendingBytes } = _regulate(input, allowPending);

    const decodedText = decoder.decode(bytesToDecode);

    return {
      decodedText,
      pendingBytes,
    };
  };
}

export class Utf8Decoder extends _DecoderBase {
  constructor(options?: DecoderOptions) {
    super({
      name: _NAME.toLowerCase(),
      bomBytes: Uint8Array.of(0xEF, 0xBB, 0xBF),
      fallback: (options?.fatal === true)
        ? Fallback.EXCEPTION
        : Fallback.REPLACEMENT, // 使用しない
      ignoreBom: options?.ignoreBOM,
      decode: _createDecode(options?.fatal),
    });
  }
}
