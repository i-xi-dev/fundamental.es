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

// function matchPattern(input: string, patternSource: string): boolean {
//   return (new RegExp(`^(?:${ patternSource })$`, "u")).test(input);
// }

// patternSource空文字列は許容しない
function _matches(input: string, patternSource: string): boolean {
  return (new RegExp(`^[${ patternSource }]*$`, "u")).test(input);
}

// // patternSource空文字列は許容しない
// function _exactMatches(input: string, patternSource: string): boolean {
//   return (new RegExp(`^[${ patternSource }]+$`, "u")).test(input);
// }

// // patternSource空文字列は許容しない
// function _startsWith(input: string, patternSource: string): boolean {
//   return (new RegExp(`^[${ patternSource }]`, "u")).test(input);
// }

// // patternSource空文字列は許容しない
// function _endsWith(input: string, patternSource: string): boolean {
//   return (new RegExp(`[${ patternSource }]$`, "u")).test(input);
// }

// patternSource空文字列は許容しない
function _contains(input: string, patternSource: string): boolean {
  return (new RegExp(`[${ patternSource }]`, "u")).test(input);
}

// patternSource空文字列は許容しない
function _trim(input: string, patternSource: string): string {
  return input.replace(new RegExp(`(?:^[${ patternSource }]+|[${ patternSource }]+$)`, "gu"), "");
}

// patternSource空文字列は許容しない
function _trimStart(input: string, patternSource: string): string {
  return input.replace(new RegExp(`^[${ patternSource }]+`, "u"), "");
}

// patternSource空文字列は許容しない
function _trimEnd(input: string, patternSource: string): string {
  return input.replace(new RegExp(`[${ patternSource }]+$`, "u"), "");
}

const CodePointRange = {
  /** [ASCII whitespace](https://infra.spec.whatwg.org/#ascii-whitespace) */
  ASCII_WHITESPACE: [
    [ 0x9 ],
    [ 0xA ],
    [ 0xC ],
    [ 0xD ],
    [ 0x20 ],
  ],

  /** [HTTP quoted-string token code point](https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point) */
  HTTP_QUOTED_STRING_TOKEN: [
    [ 0x9 ],
    [ 0x20, 0x7E ],
    [ 0x80, 0xFF ],
  ],

  /** [HTTP tab or space](https://fetch.spec.whatwg.org/#http-tab-or-space) */
  HTTP_TAB_OR_SPACE: [
    [ 0x9 ],
    [ 0x20 ],
  ],

  /** [HTTP token code point](https://mimesniff.spec.whatwg.org/#http-token-code-point) */
  HTTP_TOKEN: [
    [ 0x21 ],
    [ 0x23, 0x27 ],
    [ 0x2A ],
    [ 0x2B ],
    [ 0x2D ],
    [ 0x2E ],
    [ 0x30, 0x39 ],
    [ 0x41, 0x5A ],
    [ 0x5E, 0x60 ],
    [ 0x61, 0x7A ],
    [ 0x7C ],
    [ 0x7E ],
  ],

  /** [HTTP whitespace](https://fetch.spec.whatwg.org/#http-whitespace) */
  HTTP_WHITESPACE: [
    [ 0x9 ],
    [ 0xA ],
    [ 0xD ],
    [ 0x20 ],
  ],
} as const;
type CodePointRange = typeof CodePointRange[keyof typeof CodePointRange] | Array<[ codepoint ] | [ codepoint, codepoint ]>;

function _isCodePointRange(value: unknown): value is CodePointRange {
  if (Array.isArray(value) && (value.length > 0)) {
    return value.every((part) => {
      if (Array.isArray(part) && (part.length === 1 || part.length === 2)) {
        return part.every((i) => isCodePoint(i));
      }
      return false;
    });
  }
  return false;
}

function _rangeToRegexPattern(range: CodePointRange) {
  // if (_isCodePointRange(range)) {
    return range.map((part) => {
      if (part.length === 2) {
        return `\\u{${ part[0].toString(16) }}-\\u{${ part[1].toString(16) }}`
      }
      else if (part.length === 1) {
        return `\\u{${ part[0].toString(16) }}`
      }
      return "" as never;
    }).join("");
  // }
  // throw new TypeError("range");
}

/**
 * Unicode category of a character
 */
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

function _isUnicodeCategory(value: unknown): value is UnicodeCategory {
  if (typeof value === "string") {
    return (Object.values(UnicodeCategory) as string[]).includes(value);
  }
  return false;
}

function _isUnicodeCategoryArray(value: unknown): value is Array<UnicodeCategory> {
  if (Array.isArray(value) && (value.length > 0)) {
    return value.every((i) => _isUnicodeCategory(i));
  }
  return false;
}

function _categoriesToRegexPattern(categories: Array<UnicodeCategory>): string {
  // if (_isUnicodeCategoryArray(categories)) {
    return categories.map((category) => `\\p{gc=${ category }}`).join("");
  // }
  // throw new TypeError("categories");
}






function matches(input: string, searchObject: CodePointRange | Array<UnicodeCategory>): boolean {
  if (_isCodePointRange(searchObject)) {
    return _matches(input, _rangeToRegexPattern(searchObject));
  }
  else if (_isUnicodeCategoryArray(searchObject)) {
    return _matches(input, _categoriesToRegexPattern(searchObject));
  }
  else {
    throw new TypeError("searchObject");
  }
}

function contains(input: string, searchObject: CodePointRange | Array<UnicodeCategory>): boolean {
  if (_isCodePointRange(searchObject)) {
    return _contains(input, _rangeToRegexPattern(searchObject));
  }
  else if (_isUnicodeCategoryArray(searchObject)) {
    return _contains(input, _categoriesToRegexPattern(searchObject));
  }
  else {
    throw new TypeError("searchObject");
  }
}

function trim(input: string, searchObject: CodePointRange | Array<UnicodeCategory>): string {
  if (_isCodePointRange(searchObject)) {
    return _trim(input, _rangeToRegexPattern(searchObject));
  }
  else if (_isUnicodeCategoryArray(searchObject)) {
    return _trim(input, _categoriesToRegexPattern(searchObject));
  }
  else {
    throw new TypeError("searchObject");
  }
}

function trimStart(input: string, searchObject: CodePointRange | Array<UnicodeCategory>): string {
  if (_isCodePointRange(searchObject)) {
    return _trimStart(input, _rangeToRegexPattern(searchObject));
  }
  else if (_isUnicodeCategoryArray(searchObject)) {
    return _trimStart(input, _categoriesToRegexPattern(searchObject));
  }
  else {
    throw new TypeError("searchObject");
  }
}

function trimEnd(input: string, searchObject: CodePointRange | Array<UnicodeCategory>): string {
  if (_isCodePointRange(searchObject)) {
    return _trimEnd(input, _rangeToRegexPattern(searchObject));
  }
  else if (_isUnicodeCategoryArray(searchObject)) {
    return _trimEnd(input, _categoriesToRegexPattern(searchObject));
  }
  else {
    throw new TypeError("searchObject");
  }
}

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



/**
 * 文字列先頭から収集対象の連続を取得し返却
 *     存在しない場合、空文字列を返却
 * 
 * @param input - 文字列
 * @param pattern - 収集対象の範囲パターン
 * @returns 結果
 */
function collectPattern(input: string, pattern: string): string {
  const regex = new RegExp("^[" + pattern + "]+");
  const results = regex.exec(input);
  if (results === null) {
    return "";
  }
  return results[0] as string;
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
  CodePointRange,
  UnicodeCategory,
  collectPattern,
  collectHttpQuotedString,
  contains,
  devideByLength,
  isCodePoint,
  isRune,
  matches,
  runeFromCodePoint,
  runeToCodePoint,
  trim,
  trimEnd,
  trimStart,
};
