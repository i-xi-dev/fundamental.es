import { _encodingFailed } from "../../../_internal/utf8/main.mts";

export function mustBeNonEmptyString(target: string): RangeError {
  return new RangeError(
    `${target} must be a \`string\` with a length of at least 1`,
  );
}

// TextDecoderのデコード失敗はTypeErrorなので、そちらに寄せた
export function decodingFailed(
  encodingName: string,
  target: string,
): TypeError {
  const msg =
    `${target} must be a byte sequence that can be decoded using ${encodingName}`;
  return new TypeError(msg);
}

// TextEncoderのエンコード失敗はTypeErrorなので、そちらに寄せた
export { _encodingFailed as encodingFailed };
