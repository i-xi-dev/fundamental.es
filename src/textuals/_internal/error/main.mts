import { _encodingFailed } from "../../../_internal/utf8/main.mts";
import { mustBe } from "../../../type/error.mts";

export function mustBeNonEmptyString(target: string): TypeError { //XXX TypeErrorなのか？
  return mustBe("a `string` with a length of at least 1.", target);
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
