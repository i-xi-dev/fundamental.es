// TextDecoderのデコード失敗はTypeErrorなので、そちらに寄せた

export function decodingFailed(
  encodingName: string,
  target: string,
): TypeError {
  const msg =
    `${target} must be a byte sequence that can be decoded using ${encodingName}`;
  return new TypeError(msg);
}

export function encodingFailed(
  encodingName: string,
  target: string,
): TypeError {
  const msg =
    `${target} must be a string that can be encoded in ${encodingName}`;
  return new TypeError(msg);
}
