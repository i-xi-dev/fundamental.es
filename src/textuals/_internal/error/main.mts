//削除

import { _encodingFailed } from "../../../_internal/_utf8/main.mts";
import { RangeException } from "../../../_internal/range_error/mod.mts";

// uint16の配列であることが確定しているとき、サロゲートペアではない事を示す用
// （なのでTypeErrorではない）
export function mustBeSurrogatePair(target: string): RangeError {
  return RangeException.of(
    `When ${target} is a pair of values, ${target} must be a surrogate pair`,
  );
} //TODO 呼び出す側が target先頭を大文字にするか小文字にするか考えといけないのはちょっと。

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
