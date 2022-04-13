//

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


}
Object.freeze(Unicode);

namespace UnicodeUtils {
  export function isCategoryArray(value: unknown): value is Array<Unicode.Category> {
    if (Array.isArray(value) && (value.length > 0)) {
      return value.every((i) => Unicode.isCategory(i));
    }
    return false;
  }
}
Object.freeze(UnicodeUtils);

export {
  Unicode,
  UnicodeUtils,
};
