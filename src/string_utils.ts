//

import { isPositiveInteger } from "./number_utils";
import {
  UnicodeCategory,
  _isUnicodeCategoryArray,
} from "./unicode";

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

function _runeIsInCategory(rune: rune, category: UnicodeCategory): boolean {
  if (isRune(rune) !== true) {
    throw new TypeError("rune");
  }
  const regex = new RegExp(`^[\\p{gc=${ category }}]$`, "u");
  return regex.test(rune);
}

function runeIsSurrogate(rune: rune): boolean {
  return _runeIsInCategory(rune, UnicodeCategory.OTHER_SURROGATE);
}

function runeIsControl(rune: rune): boolean {
  return _runeIsInCategory(rune, UnicodeCategory.OTHER_CONTROL);
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

// patternSource空文字列は許容しない
function _collectStart(input: string, patternSource: string): string {
  const results = (new RegExp(`^[${ patternSource }]+`, "u")).exec(input);
  if (results === null) {
    return "";
  }
  return results[0] as string;
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

function _rangeToRegexPattern(range: CodePointRange): string {
  // if (_isCodePointRange(range)) {
  return range.map((part) => {
    if (part.length === 2) {
      return `\\u{${ part[0].toString(16) }}-\\u{${ part[1].toString(16) }}`;
    }
    else {
      return `\\u{${ part[0].toString(16) }}`;
    }
  }).join("");
  // }
  // throw new TypeError("range");
}

function _categoriesToRegexPattern(categories: Array<UnicodeCategory>): string {
  // if (_isUnicodeCategoryArray(categories)) {
  return categories.map((category) => `\\p{gc=${ category }}`).join("");
  // }
  // throw new TypeError("categories");
}


// TODO TextScript, _scriptsToRegexPattern





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

function collectStart(input: string, searchObject: CodePointRange | Array<UnicodeCategory>): string {
  if (_isCodePointRange(searchObject)) {
    return _collectStart(input, _rangeToRegexPattern(searchObject));
  }
  else if (_isUnicodeCategoryArray(searchObject)) {
    return _collectStart(input, _categoriesToRegexPattern(searchObject));
  }
  else {
    throw new TypeError("searchObject");
  }
}

const UnitToCount = {
  CHAR: "char",
  RUNE: "rune",
  // GRAPHEME: "grapheme",
} as const;
type UnitToCount = typeof UnitToCount[keyof typeof UnitToCount];

function segment(input: string, by: { count: number, unit: UnitToCount }, padding?: string): Array<string> {
  if (typeof input !== "string") {
    throw new TypeError("input");
  }
  if ((typeof by?.count !== "number") || (isPositiveInteger(by.count) !== true)) {
    throw new TypeError("by.count");
  }
  if (Object.values(UnitToCount).includes(by?.unit) !== true) {
    throw new TypeError("by.unit");
  }
  if ((typeof padding !== "string") && (padding !== undefined)) {
    throw new TypeError("padding");
  }

  if (by.unit === UnitToCount.CHAR) {
    return _devideByCharCount(input, by.count, padding);
  }
  else if (by.unit === UnitToCount.RUNE) {
    return _devideByRuneCount(input, by.count, padding);
  }
  return [] as never;
}

/**
 * 文字列を、指定したUTF-16コードユニット数ごとに分割し返却
 *     ※サロゲートペア、合成文字が分割される可能性あり
 * 
 * @param input - 分割する文字列
 * @param segmentLength - 分割単位とするUTF-16コードユニット数
 * @param paddingChar - 分割結果の配列の最後の要素がunitGroupSizeに満たない場合、最後の要素の末尾を埋める文字列
 * @returns strをunitGroupSize UTF-16コードユニットごとに分割した文字列配列
 */
function _devideByCharCount(input: string, segmentLength: number, paddingChar?: string): Array<string> {
  if ((typeof paddingChar === "string") && (paddingChar.length !== 1)) {
    throw new TypeError("paddingChar must be a code unit");
  }

  const segemntsCount = Math.ceil(input.length / segmentLength);
  const segments: Array<string> = new Array<string>(segemntsCount);
  let pos = 0;
  for (let i = 0; i < segemntsCount; i++) {
    segments[i] = input.substring(pos, pos + segmentLength);
    pos = pos + segmentLength;
  }

  if (typeof paddingChar === "string") {
    const lastSegment = segments[segments.length - 1];
    if (lastSegment) {
      segments[segments.length - 1] = lastSegment.padEnd(segmentLength, paddingChar);
    }
  }

  return segments;
}

function _devideByRuneCount(input: string, segmentLength: number, paddingRune?: rune): Array<string> {
  if ((typeof paddingRune === "string") && (isRune(paddingRune) !== true)) {
    throw new TypeError("paddingRune must be a code point");
  }

  const runes = [ ...input ];
  const segemntsCount = Math.ceil(runes.length / segmentLength);
  const segments: Array<string> = new Array<string>(segemntsCount);
  let pos = 0;
  for (let i = 0; i < segemntsCount; i++) {
    segments[i] = runes.slice(pos, pos + segmentLength).join("");
    pos = pos + segmentLength;
  }

  if (typeof paddingRune === "string") {
    const lastSegment = segments[segments.length - 1];
    if (lastSegment) {
      const lastSegmentRuneCount = [ ...lastSegment ].length;
      segments[segments.length - 1] = lastSegment +  paddingRune.repeat(segmentLength - lastSegmentRuneCount);
    }
  }

  return segments;
}





// TODO 名前変える

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
  UnitToCount,
  collectStart,
  collectHttpQuotedString,
  contains,
  isCodePoint,
  isRune,
  matches,
  runeFromCodePoint,
  runeIsControl,
  runeIsSurrogate,
  runeToCodePoint,
  segment,
  trim,
  trimEnd,
  trimStart,
};
