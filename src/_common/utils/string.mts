import { _Assert, _Type } from "../mod.mts";

export const EMPTY = "";

export function charSequenceSortComparator(a: string, b: string): number {
  _Assert.string(a, "Input-1");
  _Assert.string(b, "Input-2");

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}

export type CollectResult = {
  collected: string;
  progression: number;
  following?: boolean;
};

export type CodePointRange = [_Type.codepoint] | [
  _Type.codepoint,
  _Type.codepoint,
];

export type CodePointRangeSet = Array<CodePointRange>;

//TODO CodePointRangeSet.toPattern()

export namespace RangeSet {
  /** [HTTP quoted-string token code point](https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point) */
  export const HTTP_QUOTED_STRING_TOKEN: CodePointRangeSet = [
    [0x9],
    [0x20, 0x7E],
    [0x80, 0xFF],
  ] as const;

  /** [HTTP tab or space](https://fetch.spec.whatwg.org/#http-tab-or-space) */
  export const HTTP_TAB_OR_SPACE: CodePointRangeSet = [
    [0x9],
    [0x20],
  ] as const;

  /** [HTTP token code point](https://mimesniff.spec.whatwg.org/#http-token-code-point) */
  export const HTTP_TOKEN: CodePointRangeSet = [
    [0x21],
    [0x23, 0x27],
    [0x2A],
    [0x2B],
    [0x2D],
    [0x2E],
    [0x30, 0x39],
    [0x41, 0x5A],
    [0x5E, 0x60],
    [0x61, 0x7A],
    [0x7C],
    [0x7E],
  ] as const;

  /** [HTTP whitespace](https://fetch.spec.whatwg.org/#http-whitespace) */
  export const HTTP_WHITESPACE: CodePointRangeSet = [
    [0x9],
    [0xA],
    [0xC],
    [0xD],
    [0x20],
  ] as const;
}

function _patternFrom(rangeSet: CodePointRangeSet): string {
  const pattern = rangeSet.map((range) => {
    if (range.length === 2) {
      return `\\u{${range[0].toString(16)}}-\\u{${range[1].toString(16)}}`;
    } else {
      return `\\u{${range[0].toString(16)}}`;
    }
  }).join(EMPTY);
  return "[" + pattern + "]+";
}

export function rangesMatches(
  test: string,
  rangeSet: CodePointRangeSet,
): /* test is string */ boolean {
  //TODO assert rangeSet

  if (rangeSet.length <= 0) {
    return false;
  }

  const pattern = _patternFrom(rangeSet);
  const regex = new RegExp(`^${pattern}$`, "u");
  return _Type.isString(test) && regex.test(test);
}

export function rangesTrim(input: string, rangeSet: CodePointRangeSet): string {
  _Assert.string(input, "Input");
  //TODO assert rangeSet

  if (rangeSet.length <= 0) {
    return input;
  }

  const pattern = _patternFrom(rangeSet);
  const regex = new RegExp(`(?:^${pattern}|${pattern}$)`, "gu");
  return input.replace(regex, EMPTY);
}

export function rangesTrimEnd(
  input: string,
  rangeSet: CodePointRangeSet,
): string {
  _Assert.string(input, "Input");
  //TODO assert rangeSet

  if (rangeSet.length <= 0) {
    return input;
  }

  const pattern = _patternFrom(rangeSet);
  const regex = new RegExp(`${pattern}$`, "u");
  return input.replace(regex, EMPTY);
}

export function rangesCollectStart(
  input: string,
  rangeSet: CodePointRangeSet,
): string {
  _Assert.string(input, "Input");
  //TODO assert rangeSet

  if (rangeSet.length <= 0) {
    return input;
  }

  const pattern = _patternFrom(rangeSet);
  return patternCollectStart(input, pattern);
}

export function patternCollectStart(input: string, pattern: string): string {
  _Assert.string(input, "Input");
  _Assert.nonEmptyString(pattern, "Pattern");

  return _patternCollectStart(input, pattern);
}

function _patternCollectStart(input: string, pattern: string): string {
  const regex = new RegExp(`^${pattern}`, "u");
  const results = regex.exec(input);
  if (results === null) {
    return EMPTY;
  }
  return results[0] as string;
}
