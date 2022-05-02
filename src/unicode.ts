//

import { Integer } from "./int";

/**
 * 0x0-0x10FFFF
 */
type codepoint = number; // 厳密に定義するのは困難なので、ただのnumberの別名とする

// XXX Goや.Netに倣ってruneとしたが、ルーン文字のruneと紛らわしいのが気になる…
type rune = string; // 厳密に定義するのは困難なので、ただのstringの別名とする

function _runeIsInCategory(rune: rune, category: Unicode.Category): boolean {
  if (Unicode.Rune.isRune(rune) !== true) {
    throw new TypeError("rune");
  }
  const regex = new RegExp(`^[\\p{gc=${ category }}]$`, "u");
  return regex.test(rune);
}

/**
 * Unicode
 */
namespace Unicode {
  /**
   * Unicode category of a character
   */
  export const Category = {
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
  export type Category = typeof Category[keyof typeof Category];

  export function isCategory(value: unknown): value is Category {
    if (typeof value === "string") {
      return (Object.values(Category) as Array<string>).includes(value);
    }
    return false;
  }

  export namespace CodePoint {
    /**
     * Determines whether the passed value is an Unicode code point.
     * 
     * @param value The value to be tested
     * @returns Whether the passed value is an Unicode code point.
     */
    export function isCodePoint(value: unknown): value is codepoint {
      if ((typeof value === "number") && Integer.isNonNegativeInteger(value)) {
        return Integer.inRange(value, [ 0x0, 0x10FFFF ]);
      }
      return false;
    }
  }
  Object.freeze(CodePoint);

  export namespace Rune {
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
      return _runeIsInCategory(rune, Unicode.Category.LETTER);
    }

    export function isMark(rune: rune): boolean {
      return _runeIsInCategory(rune, Unicode.Category.MARK);
    }

    export function isNumber(rune: rune): boolean {
      return _runeIsInCategory(rune, Unicode.Category.NUMBER);
    }

    export function isPunctuation(rune: rune): boolean {
      return _runeIsInCategory(rune, Unicode.Category.PUNCTUATION);
    }

    export function isSymbol(rune: rune): boolean {
      return _runeIsInCategory(rune, Unicode.Category.SYMBOL);
    }

    export function isSeparator(rune: rune): boolean {
      return _runeIsInCategory(rune, Unicode.Category.SEPARATOR);
    }

    export function isControl(rune: rune): boolean {
      return _runeIsInCategory(rune, Unicode.Category.OTHER_CONTROL);
    }

    export function isSurrogate(rune: rune): boolean {
      return _runeIsInCategory(rune, Unicode.Category.OTHER_SURROGATE);
    }

  }
  Object.freeze(Rune);

}
Object.freeze(Unicode);

namespace UnicodeUtils {
  export function isCategoryArray(value: unknown): value is Array<Unicode.Category> {
    if (Array.isArray(value) && (value.length > 0)) {
      return value.every((i) => Unicode.isCategory(i));
    }
    return false;
  }

  export type CodePointRange = Array<[ codepoint ] | [ codepoint, codepoint ]>;

  export function isCodePointRange(value: unknown): value is CodePointRange {
    if (Array.isArray(value) && (value.length > 0)) {
      return value.every((part) => {
        if (Array.isArray(part) && (part.length === 1 || part.length === 2)) {
          return part.every((i) => Unicode.CodePoint.isCodePoint(i));
        }
        return false;
      });
    }
    return false;
  }

}
Object.freeze(UnicodeUtils);

export {
  type codepoint,
  type rune,
  Unicode,
  UnicodeUtils,
};
