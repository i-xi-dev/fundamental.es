import { _encodingFailed } from "../../../_internal/utf8/main.mts";
import { mustBe } from "../../../type/error.mts";

export function mustBeNonEmptyString(target: string): RangeError {
  return new RangeError(
    `${target} must be a \`string\` with a length of at least 1`,
  );
}

export function mustBeWellFormedString(target: string): RangeError {
  return new RangeError(
    `${target} must be a xxxxxxxxxxxxxxxxxxxx`,
  );
}

export function mustBeCodePoint(target: string): TypeError {
  return mustBe("a Unicode code point of type `number`", target);
}

export function mustBeChar16(target: string): TypeError {
  return mustBe("a TODO", target);
}

export function mustBeChar32(target: string): TypeError {
  return mustBe("a TODO", target);
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
