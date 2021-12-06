//

import { NumberUtils } from "./number_utils";

/**
 * 文字列を、指定したUTF-16コードユニット数ごとに分割し返却
 *     ※サロゲートペア、合成文字が分割される可能性あり
 * 
 * @param str - 分割する文字列
 * @param segmentLength - 分割単位とするUTF-16コードユニット数
 * @param paddingUnit - 分割結果の配列の最後の要素がunitGroupSizeに満たない場合、最後の要素の末尾を埋める文字列
 * @returns strをunitGroupSize UTF-16コードユニットごとに分割した文字列配列
 */
function devideByLength(str: string, segmentLength: number, paddingUnit?: string): Array<string> {
  if (NumberUtils.isPositiveInteger(segmentLength) !== true) {
    throw new TypeError("segmentLength must be positive integer");
  }
  if ((typeof paddingUnit === "string") && (paddingUnit.length !== 1)) {
    throw new TypeError("paddingUnit must be a code unit");
  }

  const segemntsCount = Math.ceil(str.length / segmentLength);
  const segments: Array<string> = new Array<string>(segemntsCount);
  let pos = 0;
  for (let i = 0; i < segemntsCount; i++) {
    segments[i] = str.substring(pos, pos + segmentLength);
    pos = pos + segmentLength;
  }

  if (typeof paddingUnit === "string") {
    const lastSegment = segments[segments.length - 1];
    if (lastSegment) {
      segments[segments.length - 1] = lastSegment.padEnd(segmentLength, paddingUnit);
    }
  }

  return segments;
}

/**
 * 範囲パターン
 */
const RangePattern = Object.freeze({
  /** {@link [ASCII whitespace](https://infra.spec.whatwg.org/#ascii-whitespace)} */
  ASCII_WHITESPACE: "\\u0009\\u000A\\u000C\\u000D\\u0020",

  /** {@link [HTTP quoted-string token code point](https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point)} */
  HTTP_QUOTED_STRING_TOKEN: "\\u0009\\u0020-\\u007E\\u0080-\\u00FF",

  /** {@link [HTTP tab or space](https://fetch.spec.whatwg.org/#http-tab-or-space)} */
  HTTP_TAB_OR_SPACE: "\\u0009\\u0020",

  /** {@link [HTTP token code point](https://mimesniff.spec.whatwg.org/#http-token-code-point)} */
  HTTP_TOKEN: "\\u0021\\u0023-\\u0027\\u002A\\u002B\\u002D\\u002E0-9A-Za-z\\u005E\\u005F\\u0060\\u007C\\u007E",

  /** {@link [HTTP whitespace](https://fetch.spec.whatwg.org/#http-whitespace)} */
  HTTP_WHITESPACE: "\\u0009\\u000A\\u000D\\u0020",
});
type RangePattern = typeof RangePattern[keyof typeof RangePattern];

/**
 * 文字列先頭から収集対象の連続を取得し返却
 *     存在しない場合、空文字列を返却
 * 
 * @param str - 文字列
 * @param rangePattern - 収集対象の範囲パターン
 * @returns 結果
 */
function collectStart(str: string, rangePattern: RangePattern): string {
  const regex = new RegExp("^[" + rangePattern + "]+");
  const results = regex.exec(str);
  if (results === null) {
    return "";
  }
  return results[0] as string;
}

/**
 * 文字列がrangePatternの範囲のみからなる文字列
 * であるか否かを返却
 * 
 * @param str - 文字列
 * @param rangePattern - 範囲パターン
 * @returns 結果
 */
function match(str: string, rangePattern: RangePattern): boolean {
  const regex = new RegExp("^[" + rangePattern + "]*$");
  return regex.test(str);
}

/**
 * 文字列から先頭および末尾のrangePatternの範囲の部分文字列を削除した文字列を返却
 * 
 * @param str - 文字列
 * @param rangePattern - 削除対象の範囲パターン
 * @returns 文字列
 */
function trim(str: string, rangePattern: RangePattern): string {
  const regex = new RegExp("(^[" + rangePattern + "]+|[" + rangePattern + "]+$)", "g");
  // return str.replaceAll(regex, "");
  return str.replace(regex, "");
}

/**
 * 文字列から末尾のrangePatternの範囲の部分文字列を削除した文字列を返却
 * 
 * @param str - 文字列
 * @param rangePattern - 削除対象の範囲パターン
 * @returns 文字列
 */
function trimEnd(str: string, rangePattern: RangePattern): string {
  const regex = new RegExp("[" + rangePattern + "]+$");
  return str.replace(regex, "");
}

/**
 * The utilities for string processing.
 */
const StringUtils = Object.freeze({
  RangePattern,
  collectStart,
  devideByLength,
  match,
  trim,
  trimEnd,
});

export { StringUtils };
