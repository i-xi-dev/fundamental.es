//

import { isPositiveInteger } from "./number_utils";

type codepoint = number; // 0x10FFFF個を列挙するとか馬鹿げているので、ただのnumberの別名とする

/**
 * Determines whether the passed value is an Unicode code point.
 * 
 * @param value - The value to be tested
 * @returns Whether the passed value is an Unicode code point.
 */
function isCodePoint(value: unknown): value is codepoint {
  if (typeof value === "number") {
    return (Number.isSafeInteger(value) && (value >= 0x0) && (value <= 0x10FFFF));
  }
  return false;
}

// XXX Goや.Netに倣ってruneとしたが、ルーン文字のruneと紛らわしいのが気になる…
type rune = string; // 0x10FFFF個を列挙するとか馬鹿げているので、ただのstringの別名とする

function isRune(value: unknown): value is rune {
  if (typeof value !== "string") {
    return false;
  }
  if (value.length > 2) {
    return false;
  }
  const runes = [ ...value ];
  if (runes.length !== 1) {
    return false;
  }
  return true;
}

function runeFromCodePoint(codePoint: codepoint): rune {
  if (isCodePoint(codePoint) !== true) {
    throw new TypeError("codePoint");
  }
  return String.fromCodePoint(codePoint);
}

function runeToCodePoint(rune: rune): codepoint {
  if (isRune(rune) !== true) {
    throw new TypeError("rune");
  }
  return rune.codePointAt(0) as codepoint;
}

const UnicodeCategory = {
  LETTER: "L",
  LETTER_UPPERCASE: "Lu",
  LETTER_LOWERCASE: "Ll",
  LETTER_TITLECASE: "Lt",
  LETTER_MODIFIER: "Lm",
  LETTER_OTHER: "Lo",
  MARK: "M",
  MARK_NONSPACING: "Mn",
  MARK_SPACING_COMBINING: "Mc",
  MARK_ENCLOSING: "Me",
  NUMBER: "N",
  NUMBER_DECIMAL_DIGIT: "Nd",
  NUMBER_LETTER: "Nl",
  NUMBER_OTHER: "No",
  PUNCTUATION: "P",
  PUNCTUATION_CONNECTOR: "Pc",
  PUNCTUATION_DASH: "Pd",
  PUNCTUATION_OPEN: "Ps",
  PUNCTUATION_CLOSE: "Pe",
  PUNCTUATION_INITIAL_QUOTE: "Pi",
  PUNCTUATION_FINAL_QUOTE: "Pf",
  PUNCTUATION_OTHER: "Po",
  SYMBOL: "S",
  SYMBOL_MATH: "Sm",
  SYMBOL_CURRENCY: "Sc",
  SYMBOL_MODIFIER: "Sk",
  SYMBOL_OTHER: "So",
  SEPARATOR: "Z",
  SEPARATOR_SPACE: "Zs",
  SEPARATOR_LINE: "Zl",
  SEPARATOR_PARAGRAPH: "Zp",
  OTHER: "C",
  OTHER_CONTROL: "Cc",
  OTHER_FORMAT: "Cf",
  OTHER_SURROGATE: "Cs",
  OTHER_PRIVATE_USE: "Co",
  OTHER_NOT_ASSIGNED: "Cn",
} as const;
type UnicodeCategory = typeof UnicodeCategory[keyof typeof UnicodeCategory];

//TODO matchCategories, containsCategories

//TODO matchScripts, containsScripts






/**
 * 文字列を、指定したUTF-16コードユニット数ごとに分割し返却
 *     ※サロゲートペア、合成文字が分割される可能性あり
 * 
 * @param input - 分割する文字列
 * @param segmentLength - 分割単位とするUTF-16コードユニット数
 * @param paddingUnit - 分割結果の配列の最後の要素がunitGroupSizeに満たない場合、最後の要素の末尾を埋める文字列
 * @returns strをunitGroupSize UTF-16コードユニットごとに分割した文字列配列
 */
function devideByLength(input: string, segmentLength: number, paddingUnit?: string): Array<string> {
  if (isPositiveInteger(segmentLength) !== true) {
    throw new TypeError("segmentLength must be positive integer");
  }
  if ((typeof paddingUnit === "string") && (paddingUnit.length !== 1)) {
    throw new TypeError("paddingUnit must be a code unit");
  }

  const segemntsCount = Math.ceil(input.length / segmentLength);
  const segments: Array<string> = new Array<string>(segemntsCount);
  let pos = 0;
  for (let i = 0; i < segemntsCount; i++) {
    segments[i] = input.substring(pos, pos + segmentLength);
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

//TODO 名前変える
/**
 * 範囲パターン
 */
const RangePattern = Object.freeze({
  /** [ASCII whitespace](https://infra.spec.whatwg.org/#ascii-whitespace) */
  ASCII_WHITESPACE: "\\u0009\\u000A\\u000C\\u000D\\u0020",

  /** [HTTP quoted-string token code point](https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point) */
  HTTP_QUOTED_STRING_TOKEN: "\\u0009\\u0020-\\u007E\\u0080-\\u00FF",

  /** [HTTP tab or space](https://fetch.spec.whatwg.org/#http-tab-or-space) */
  HTTP_TAB_OR_SPACE: "\\u0009\\u0020",

  /** [HTTP token code point](https://mimesniff.spec.whatwg.org/#http-token-code-point) */
  HTTP_TOKEN: "\\u0021\\u0023-\\u0027\\u002A\\u002B\\u002D\\u002E0-9A-Za-z\\u005E\\u005F\\u0060\\u007C\\u007E",

  /** [HTTP whitespace](https://fetch.spec.whatwg.org/#http-whitespace) */
  HTTP_WHITESPACE: "\\u0009\\u000A\\u000D\\u0020",
});
type RangePattern = typeof RangePattern[keyof typeof RangePattern];

/**
 * 文字列先頭から収集対象の連続を取得し返却
 *     存在しない場合、空文字列を返却
 * 
 * @param input - 文字列
 * @param pattern - 収集対象の範囲パターン
 * @returns 結果
 */
function collectPattern(input: string, pattern: RangePattern): string {
  const regex = new RegExp("^[" + pattern + "]+");
  const results = regex.exec(input);
  if (results === null) {
    return "";
  }
  return results[0] as string;
}

/**
 * 文字列がrangePatternの範囲のみからなる文字列
 * であるか否かを返却
 * 
 * @param input - 文字列
 * @param pattern - 範囲パターン
 * @returns 結果
 */
function matchPattern(input: string, pattern: RangePattern): boolean {
  const regex = new RegExp("^[" + pattern + "]*$");
  return regex.test(input);
}

/**
 * 文字列から先頭および末尾のrangePatternの範囲の部分文字列を削除した文字列を返却
 * 
 * @param input - 文字列
 * @param pattern - 削除対象の範囲パターン
 * @returns 文字列
 */
function trimPattern(input: string, pattern: RangePattern): string {
  const regex = new RegExp("(^[" + pattern + "]+|[" + pattern + "]+$)", "g");
  // return input.replaceAll(regex, "");
  return input.replace(regex, "");
}

/**
 * 文字列から末尾のrangePatternの範囲の部分文字列を削除した文字列を返却
 * 
 * @param input - 文字列
 * @param pattern - 削除対象の範囲パターン
 * @returns 文字列
 */
function trimPatternEnd(input: string, pattern: RangePattern): string {
  const regex = new RegExp("[" + pattern + "]+$");
  return input.replace(regex, "");
}

type CollectResult = {
  collected: string,
  progression: number,
  following?: boolean,
};

/**
 * 文字列の先頭のHTTP quoted stringを取得し返却
 *     仕様は https://fetch.spec.whatwg.org/#collect-an-http-quoted-string
 * 
 * - collected: 引用符で括られていた値。引用符とエスケープ文字は取り除いて返す
 * - progression: 取得した文字数。（終了引用符までを含む）
 *                引用符とエスケープ文字を含むのでcollected.lengthとは一致しない
 * 
 * @param input - 先頭がU+0022の文字列
 * @returns 結果
 */
function collectHttpQuotedString(input: string): CollectResult {
  // 2.
  let value = "";

  // 3.
  if (input.startsWith('"') !== true) {
    return {
      collected: value,
      progression: 0,
    };
  }

  // 4.
  const text2 = input.substring(1);

  // 5.
  let escaped = false;
  let i = 0;
  for (i = 0; i < text2.length; i++) {
    const c: string = text2[i] as string;

    if (escaped === true) {
      value = value + c;
      escaped = false;
      continue;
    }
    else {
      if (c === '"') {
        i++;
        break;
      }
      else if (c === "\\") {
        escaped = true;
        continue;
      }
      else {
        value = value + c;
        continue;
      }
    }
  }

  if (escaped === true) {
    value = value + "\\";
  }

  return {
    collected: value,
    progression: (i + 1),
  };
}

export {
  type codepoint,
  type rune,
  type CollectResult,
  UnicodeCategory,
  RangePattern,
  collectPattern,
  collectHttpQuotedString,
  devideByLength,
  isCodePoint,
  isRune,
  matchPattern,
  runeFromCodePoint,
  runeToCodePoint,
  trimPattern,
  trimPatternEnd,
};
