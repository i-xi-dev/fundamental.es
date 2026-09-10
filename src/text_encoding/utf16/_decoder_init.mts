import { _BYTES_PER_CHAR } from "./_common.mts";
import { _DecodeFunc, _DecoderInit } from "../_decoder_init.mts";
import { _Type, CodePoint } from "../../_common/mod.mts";
import { ByteOrder } from "../../mod.mts";
import { DecoderOptions } from "../decoder_options.mts";
import { Fallback } from "../fallback.mts";
import { Uint16 } from "../../numerics/uint.mts";

function _regulate(
  bytes: _Type.Bytes,
  littleEndian: boolean,
  allowPending?: boolean,
): {
  bytesToDecode: _Type.Bytes;
  pendingBytes: _Type.Bytes | null;
} {
  const p: Array<_Type.safeint> = [];
  let x: _Type.Bytes = bytes;

  if ((allowPending === true) && (x.length > 0)) {
    if ((x.length % _BYTES_PER_CHAR) !== 0) {
      // 2バイトが分断されている場合
      p.push(x.at(-1)!);
      x = x.subarray(0, -1);
    }

    if (x.length >= 2) {
      // 末尾2バイトが上位サロゲートの場合pending
      const lastUnit = Uint16.fromBytes(
        Uint8Array.of(x.at(-2)!, x.at(-1)!),
        littleEndian ? ByteOrder.LITTLE_ENDIAN : ByteOrder.BIG_ENDIAN,
      );
      if (CodePoint.isHighSurrogate(lastUnit) === true) {
        p.push(x.at(-1)!);
        p.push(x.at(-2)!);
        x = x.subarray(0, -2);
      }
    }
  }

  // 分断を検知しなかった場合はそのまま返す
  // エラーの並びだった場合や孤立サロゲートはここで考慮する必要は無い（TextDecoderに処理させる）
  return {
    bytesToDecode: x.slice(),
    pendingBytes: (p.length > 0) ? Uint8Array.from(p.reverse()) : null,
  };
}

function _createDecode(
  name: string,
  littleEndian: boolean,
  fatal?: boolean,
): _DecodeFunc {
  const decoder = new TextDecoder(name, {
    fatal: fatal === true,
    ignoreBOM: true,
  });

  return (input: _Type.Bytes, allowPending?: boolean) => {
    const { bytesToDecode, pendingBytes } = _regulate(
      input,
      littleEndian,
      allowPending,
    );

    const decodedText = decoder.decode(bytesToDecode);

    return {
      decodedText,
      pendingBytes,
    };
  };
}

export function _createDecoderInit(
  name: string,
  littleEndian: boolean,
  options?: DecoderOptions,
): _DecoderInit {
  return {
    name: name.toLowerCase(),
    bomBytes: (littleEndian === true)
      ? Uint8Array.of(0xFF, 0xFE)
      : Uint8Array.of(0xFE, 0xFF),
    fallback: (options?.fatal === true)
      ? Fallback.EXCEPTION
      : Fallback.REPLACEMENT, // 使用しない
    ignoreBom: options?.ignoreBom,
    decode: _createDecode(name, littleEndian, options?.fatal),
  };
}
