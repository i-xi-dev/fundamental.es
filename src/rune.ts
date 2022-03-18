//

import {
  UnicodeCategory,
} from "./unicode";

type codepoint = number; // 厳密に定義するのは困難なので、ただのnumberの別名とする

namespace CodePoint {
  /**
   * Determines whether the passed value is an Unicode code point.
   * 
   * @param value - The value to be tested
   * @returns Whether the passed value is an Unicode code point.
   */
  export function isCodePoint(value: unknown): value is codepoint {
    if (typeof value === "number") {
      return (Number.isSafeInteger(value) && (value >= 0x0) && (value <= 0x10FFFF));
    }
    return false;
  }
}

// XXX Goや.Netに倣ってruneとしたが、ルーン文字のruneと紛らわしいのが気になる…
type rune = string; // 厳密に定義するのは困難なので、ただのstringの別名とする

function _runeIsInCategory(rune: rune, category: UnicodeCategory): boolean {
  if (Rune.isRune(rune) !== true) {
    throw new TypeError("rune");
  }
  const regex = new RegExp(`^[\\p{gc=${ category }}]$`, "u");
  return regex.test(rune);
}

namespace Rune {
  export function isRune(value: unknown): value is rune {
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

  export function fromCodePoint(codePoint: codepoint): rune {
    if (CodePoint.isCodePoint(codePoint) !== true) {
      throw new TypeError("codePoint");
    }
    return String.fromCodePoint(codePoint);
  }

  export function toCodePoint(rune: rune): codepoint {
    if (isRune(rune) !== true) {
      throw new TypeError("rune");
    }
    return rune.codePointAt(0) as codepoint;
  }

  export function isLetter(rune: rune): boolean {
    return _runeIsInCategory(rune, UnicodeCategory.LETTER);
  }

  export function isControl(rune: rune): boolean {
    return _runeIsInCategory(rune, UnicodeCategory.OTHER_CONTROL);
  }

  export function isSurrogate(rune: rune): boolean {
    return _runeIsInCategory(rune, UnicodeCategory.OTHER_SURROGATE);
  }

}

export {
  type codepoint,
  type rune,
  CodePoint,
  Rune,
};
