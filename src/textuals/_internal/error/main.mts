import { _encodingFailed } from "../../../_internal/_utf8/main.mts";
import { mustBe } from "../../../type/error.mts";
import { RangeException } from "../../../_internal/range_error/mod.mts";

export function mustBeNonEmptyString(target: string): RangeError {
  return RangeException.of(
    `${target} must be a \`string\` with a length of at least 1`,
  );
}

export function mustBeWellFormedString(target: string): RangeError {
  return RangeException.of(`${target} must be a well-formed \`string\``);
}

export function mustBeNonSurrogateCodePoint(target: string): TypeError {
  return mustBe("a non-surrogate Unicode code point of type `number`", target);
}

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
