import { _BYTES_PER_CHAR, _NAME } from "./_common.mts";
import { _DecodeFunc, _DecoderInit } from "../_decoder_init.mts";
import { _Type } from "../../_common/mod.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { Fallback } from "../fallback.mts";

function _regulate(bytes: _Type.Bytes, allowPending?: boolean): {
  bytesToDecode: _Type.Bytes;
  pendingBytes: _Type.Bytes | null;
} {
  if ((allowPending === true) && (bytes.length > 0)) {
    if ((bytes.length % _BYTES_PER_CHAR) !== 0) {
      //TODO 末尾1バイトをpending
    }

    //TODO 末尾2バイトが上位サロゲートの場合pending
    // const lastByte = bytes.at(-1)!;
    // const lastByte2 = bytes.at(-2)!;
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

export function _createDecoderInit(options?: DecoderOptions): _DecoderInit {
  return {
    name: _NAME.toLowerCase(),
    bomBytes: Uint8Array.of(0xFE, 0xFF),
    fallback: (options?.fatal === true)
      ? Fallback.EXCEPTION
      : Fallback.REPLACEMENT, // 使用しない
    ignoreBom: options?.ignoreBOM,
    decode: _createDecode(options?.fatal),
  };
}
