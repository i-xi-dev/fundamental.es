import { _encodingFailed } from "../../../_internal/utf8/main.mts";

// TextDecoderのデコード失敗はTypeErrorなので、そちらに寄せた

export function decodingFailed(
  encodingName: string,
  target: string,
): TypeError {
  const msg =
    `${target} must be a byte sequence that can be decoded using ${encodingName}`;
  return new TypeError(msg);
}

export { _encodingFailed as encodingFailed };
