//

import { isPositiveInteger } from "./number_utils";
import {
  UnicodeCategory,
  _isUnicodeCategoryArray,
} from "./unicode";
import {
  type codepoint,
  type rune,
  CodePoint,
  Rune,
} from "./rune";
import {
  type script,
  Script,
  ScriptSet,
} from "./script";

function _isScriptArray(value: unknown): value is Array<script> {
  if (Array.isArray(value) && (value.length > 0)) {
    return value.every((i) => Script.isScript(i));
  }
  return false;
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
        return part.every((i) => CodePoint.isCodePoint(i));
      }
      return false;
    });
  }
  return false;
}

function _rangeToRegexPattern(range: CodePointRange): string {
  return range.map((part) => {
    if (part.length === 2) {
      return `\\u{${ part[0].toString(16) }}-\\u{${ part[1].toString(16) }}`;
    }
    else {
      return `\\u{${ part[0].toString(16) }}`;
    }
  }).join("");
}

function _categoriesToRegexPattern(categories: Array<UnicodeCategory>): string {
  const set = new Set(categories);
  return [ ...set ].map((category) => `\\p{gc=${ category }}`).join("");
}

function _scriptsToRegexPattern(scripts: Array<script>): string {
  const set = ScriptSet.fromArray(scripts);
  set.normalize({ compose: "decomposition" });
  return [ ...set ].map((script) => `\\p{scx=${script}}`).join("");
  // XXX scxではなくscにしたいケースはあるか？
}

function _toRegexPattern(searchObject: CodePointRange | Array<string>): string {
  if (_isCodePointRange(searchObject)) {
    return _rangeToRegexPattern(searchObject);
  }
  else if (_isUnicodeCategoryArray(searchObject)) {
    return _categoriesToRegexPattern(searchObject);
  }
  else if (_isScriptArray(searchObject)) {
    return _scriptsToRegexPattern(searchObject);
  }
  throw new TypeError("searchObject");
}

function matches(input: string, searchObject: CodePointRange | Array<string>): boolean {
  const regexPattern = _toRegexPattern(searchObject);
  return _matches(input, regexPattern);
}

function contains(input: string, searchObject: CodePointRange | Array<string>): boolean {
  const regexPattern = _toRegexPattern(searchObject);
  return _contains(input, regexPattern);
}

function trim(input: string, searchObject: CodePointRange | Array<string>): string {
  const regexPattern = _toRegexPattern(searchObject);
  return _trim(input, regexPattern);
}

function trimStart(input: string, searchObject: CodePointRange | Array<string>): string {
  const regexPattern = _toRegexPattern(searchObject);
  return _trimStart(input, regexPattern);
}

function trimEnd(input: string, searchObject: CodePointRange | Array<string>): string {
  const regexPattern = _toRegexPattern(searchObject);
  return _trimEnd(input, regexPattern);
}

function collectStart(input: string, searchObject: CodePointRange | Array<string>): string {
  const regexPattern = _toRegexPattern(searchObject);
  return _collectStart(input, regexPattern);
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
  if ((typeof paddingRune === "string") && (Rune.isRune(paddingRune) !== true)) {
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
  matches,
  segment,
  trim,
  trimEnd,
  trimStart,
};
