//

import { type int, Integer } from "./int.ts";
import { type rune, Unicode, UnicodeUtils } from "./unicode.ts";
import { Script, type script, ScriptSet } from "./script.ts";

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
  return (new RegExp(`^[${patternSource}]*$`, "u")).test(input);
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
  return (new RegExp(`[${patternSource}]`, "u")).test(input);
}

// patternSource空文字列は許容しない
function _trim(input: string, patternSource: string): string {
  return input.replace(
    new RegExp(`(?:^[${patternSource}]+|[${patternSource}]+$)`, "gu"),
    "",
  );
}

// patternSource空文字列は許容しない
function _trimStart(input: string, patternSource: string): string {
  return input.replace(new RegExp(`^[${patternSource}]+`, "u"), "");
}

// patternSource空文字列は許容しない
function _trimEnd(input: string, patternSource: string): string {
  return input.replace(new RegExp(`[${patternSource}]+$`, "u"), "");
}

// patternSource空文字列は許容しない
function _collectStart(
  input: string,
  patternSource: string,
  negative: boolean,
): string {
  const results =
    (new RegExp(`^[${(negative === true) ? "^" : ""}${patternSource}]+`, "u"))
      .exec(input);
  if (results === null) {
    return "";
  }
  return results[0] as string;
}

function _rangeToRegexPattern(range: UnicodeUtils.CodePointRange): string {
  return range.map((part) => {
    if (part.length === 2) {
      return `\\u{${part[0].toString(16)}}-\\u{${part[1].toString(16)}}`;
    } else {
      return `\\u{${part[0].toString(16)}}`;
    }
  }).join("");
}

function _categoriesToRegexPattern(
  categories: Array<Unicode.Category>,
): string {
  const set = new Set(categories);
  return [...set].map((category) => `\\p{gc=${category}}`).join("");
}

function _scriptsToRegexPattern(scripts: Array<script>): string {
  const set = ScriptSet.fromArray(scripts);
  set.normalize({ compose: "decomposition" });
  return [...set].map((script) => `\\p{scx=${script}}`).join("");
  // XXX scxではなくscにしたいケースはあるか？
}

function _toRegexPattern(
  searchObject: UnicodeUtils.CodePointRange | Array<string>,
): string {
  if (UnicodeUtils.isCodePointRange(searchObject)) {
    return _rangeToRegexPattern(searchObject);
  } else if (UnicodeUtils.isCategoryArray(searchObject)) {
    return _categoriesToRegexPattern(searchObject);
  } else if (_isScriptArray(searchObject)) {
    return _scriptsToRegexPattern(searchObject);
  }
  throw new TypeError("searchObject");
}

/**
 * 文字列を、指定したUTF-16コードユニット数ごとに分割し返却
 *     ※サロゲートペア、合成文字が分割される可能性あり
 *
 * @param input 分割する文字列
 * @param segmentLength 分割単位とするUTF-16コードユニット数
 * @param paddingChar 分割結果の配列の最後の要素がunitGroupSizeに満たない場合、最後の要素の末尾を埋める文字列
 * @returns strをunitGroupSize UTF-16コードユニットごとに分割した文字列配列
 */
function _devideByCharCount(
  input: string,
  segmentLength: number,
  paddingChar?: string,
): Array<string> {
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
      segments[segments.length - 1] = lastSegment.padEnd(
        segmentLength,
        paddingChar,
      );
    }
  }

  return segments;
}

function _devideByRuneCount(
  input: string,
  segmentLength: number,
  paddingRune?: rune,
): Array<string> {
  if (
    (typeof paddingRune === "string") &&
    (Unicode.Rune.isRune(paddingRune) !== true)
  ) {
    throw new TypeError("paddingRune must be a code point");
  }

  const runes = [...input];
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
      const lastSegmentRuneCount = [...lastSegment].length;
      segments[segments.length - 1] = lastSegment +
        paddingRune.repeat(segmentLength - lastSegmentRuneCount);
    }
  }

  return segments;
}

namespace StringUtils {
  export const Unit = {
    CHAR: "char",
    RUNE: "rune",
    // GRAPHEME: "grapheme",
  } as const;
  export type Unit = typeof Unit[keyof typeof Unit];

  export function matches(
    input: string,
    searchObject: UnicodeUtils.CodePointRange | Array<string>,
  ): boolean {
    const regexPattern = _toRegexPattern(searchObject);
    return _matches(input, regexPattern);
  }

  export function contains(
    input: string,
    searchObject: UnicodeUtils.CodePointRange | Array<string>,
  ): boolean {
    const regexPattern = _toRegexPattern(searchObject);
    return _contains(input, regexPattern);
  }

  export function collectStart(
    input: string,
    searchObject: UnicodeUtils.CodePointRange | Array<string>,
    negative = false,
  ): string {
    const regexPattern = _toRegexPattern(searchObject);
    return _collectStart(input, regexPattern, negative);
  }

  export function trim(
    input: string,
    searchObject: UnicodeUtils.CodePointRange | Array<string>,
  ): string {
    const regexPattern = _toRegexPattern(searchObject);
    return _trim(input, regexPattern);
  }

  export function trimStart(
    input: string,
    searchObject: UnicodeUtils.CodePointRange | Array<string>,
  ): string {
    const regexPattern = _toRegexPattern(searchObject);
    return _trimStart(input, regexPattern);
  }

  export function trimEnd(
    input: string,
    searchObject: UnicodeUtils.CodePointRange | Array<string>,
  ): string {
    const regexPattern = _toRegexPattern(searchObject);
    return _trimEnd(input, regexPattern);
  }

  export function segment(
    input: string,
    by: { count: int; unit: Unit },
    padding?: string,
  ): Array<string> {
    if (typeof input !== "string") {
      throw new TypeError("input");
    }
    if (
      (typeof by?.count !== "number") ||
      (Integer.isPositiveInteger(by.count) !== true)
    ) {
      throw new TypeError("by.count");
    }
    if (Object.values(Unit).includes(by?.unit) !== true) {
      throw new TypeError("by.unit");
    }
    if ((typeof padding !== "string") && (padding !== undefined)) {
      throw new TypeError("padding");
    }

    if (by.unit === Unit.CHAR) {
      return _devideByCharCount(input, by.count, padding);
    } else if (by.unit === Unit.RUNE) {
      return _devideByRuneCount(input, by.count, padding);
    }
    return [] as never;
  }
}

export { StringUtils };
