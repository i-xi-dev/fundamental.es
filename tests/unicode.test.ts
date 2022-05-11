import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Unicode } from "../src/unicode.ts";

Deno.test("Unicode.CodePoint.isCodePoint", () => {
  // isCodePoint(number)
  assertStrictEquals(Unicode.CodePoint.isCodePoint(-1), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(-0), true);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(0), true);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(1_114_111), true);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(1_114_112), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(0.1), false);

  // isCodePoint(any)
  assertStrictEquals(Unicode.CodePoint.isCodePoint("0"), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint("1114111"), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(true), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint({}), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint([]), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint([0]), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(undefined), false);
  assertStrictEquals(Unicode.CodePoint.isCodePoint(null), false);
});

Deno.test("Unicode.Rune.isRune", () => {
  // isRune(string)
  assertStrictEquals(Unicode.Rune.isRune(""), false);
  assertStrictEquals(Unicode.Rune.isRune("\u0000"), true);
  assertStrictEquals(Unicode.Rune.isRune("\uFFFF"), true);
  assertStrictEquals(Unicode.Rune.isRune("a"), true);
  assertStrictEquals(Unicode.Rune.isRune("あ"), true);
  assertStrictEquals(Unicode.Rune.isRune("\u{10FFFF}"), true);
  assertStrictEquals(Unicode.Rune.isRune("\uD800"), true);
  assertStrictEquals(Unicode.Rune.isRune("\uD800\uDC00"), true);
  assertStrictEquals(Unicode.Rune.isRune("\uD7FF\uDC00"), false);
  assertStrictEquals(Unicode.Rune.isRune("aa"), false);
  assertStrictEquals(Unicode.Rune.isRune("aaa"), false);

  // isRune(any)
  assertStrictEquals(Unicode.Rune.isRune(undefined), false);
  assertStrictEquals(Unicode.Rune.isRune(1), false);
});

Deno.test("Unicode.Rune.fromCodePoint", () => {
  // fromCodePoint(number)
  assertStrictEquals(Unicode.Rune.fromCodePoint(0), "\u0000");
  assertStrictEquals(Unicode.Rune.fromCodePoint(0x10FFFF), "\u{10FFFF}");
  assertStrictEquals(Unicode.Rune.fromCodePoint(0xD800), "\uD800");

  assertThrows(() => {
    Unicode.Rune.fromCodePoint(-1);
  }, TypeError, undefined, "codePoint");
  assertThrows(() => {
    Unicode.Rune.fromCodePoint(0x110000);
  }, TypeError, undefined, "codePoint");

  // fromCodePoint(any)
  assertThrows(() => {
    Unicode.Rune.fromCodePoint(undefined as unknown as number);
  }, TypeError, undefined, "codePoint");
  assertThrows(() => {
    Unicode.Rune.fromCodePoint("0" as unknown as number);
  }, TypeError, undefined, "codePoint");
});

Deno.test("Unicode.Rune.toCodePoint", () => {
  // toCodePoint(string)
  assertStrictEquals(Unicode.Rune.toCodePoint("\u0000"), 0x0);
  assertStrictEquals(Unicode.Rune.toCodePoint("\u{10FFFF}"), 0x10FFFF);
  assertStrictEquals(Unicode.Rune.toCodePoint("\uD800"), 0xD800);

  assertThrows(() => {
    Unicode.Rune.toCodePoint("");
  }, TypeError, undefined, "rune");
  assertThrows(() => {
    Unicode.Rune.toCodePoint("aa");
  }, TypeError, undefined, "rune");

  // toCodePoint(any)
  assertThrows(() => {
    Unicode.Rune.toCodePoint(undefined as unknown as string);
  }, TypeError, undefined, "rune");
  assertThrows(() => {
    Unicode.Rune.toCodePoint(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isLetter", () => {
  // isLetter(string)
  assertStrictEquals(Unicode.Rune.isLetter("\u0000"), false);
  assertStrictEquals(Unicode.Rune.isLetter("a"), true);
  assertStrictEquals(Unicode.Rune.isLetter("A"), true);
  assertStrictEquals(Unicode.Rune.isLetter("1"), false);
  assertStrictEquals(Unicode.Rune.isLetter("="), false);

  assertThrows(() => {
    Unicode.Rune.isLetter("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isLetter(any)
  assertThrows(() => {
    Unicode.Rune.isLetter(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isMark", () => {
  // isMark(string)
  assertStrictEquals(Unicode.Rune.isMark("\u0000"), false);
  assertStrictEquals(Unicode.Rune.isMark("a"), false);
  assertStrictEquals(Unicode.Rune.isMark("A"), false);
  assertStrictEquals(Unicode.Rune.isMark("1"), false);
  assertStrictEquals(Unicode.Rune.isMark("="), false);
  assertStrictEquals(Unicode.Rune.isMark("\u0300"), true);

  assertThrows(() => {
    Unicode.Rune.isMark("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isMark(any)
  assertThrows(() => {
    Unicode.Rune.isMark(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isNumber", () => {
  // isNumber(string)
  assertStrictEquals(Unicode.Rune.isNumber("\u0000"), false);
  assertStrictEquals(Unicode.Rune.isNumber("a"), false);
  assertStrictEquals(Unicode.Rune.isNumber("A"), false);
  assertStrictEquals(Unicode.Rune.isNumber("1"), true);
  assertStrictEquals(Unicode.Rune.isNumber("="), false);

  assertThrows(() => {
    Unicode.Rune.isNumber("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isNumber(any)
  assertThrows(() => {
    Unicode.Rune.isNumber(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isPunctuation", () => {
  // isPunctuation(string)
  assertStrictEquals(Unicode.Rune.isPunctuation("\u0000"), false);
  assertStrictEquals(Unicode.Rune.isPunctuation("a"), false);
  assertStrictEquals(Unicode.Rune.isPunctuation("A"), false);
  assertStrictEquals(Unicode.Rune.isPunctuation("1"), false);
  assertStrictEquals(Unicode.Rune.isPunctuation("="), false);
  assertStrictEquals(Unicode.Rune.isPunctuation("\u002C"), true);

  assertThrows(() => {
    Unicode.Rune.isPunctuation("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isPunctuation(any)
  assertThrows(() => {
    Unicode.Rune.isPunctuation(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isSymbol", () => {
  // isSymbol(string)
  assertStrictEquals(Unicode.Rune.isSymbol("\u0000"), false);
  assertStrictEquals(Unicode.Rune.isSymbol("a"), false);
  assertStrictEquals(Unicode.Rune.isSymbol("A"), false);
  assertStrictEquals(Unicode.Rune.isSymbol("1"), false);
  assertStrictEquals(Unicode.Rune.isSymbol("="), true);
  assertStrictEquals(Unicode.Rune.isSymbol("\u002B"), true);

  assertThrows(() => {
    Unicode.Rune.isSymbol("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isSymbol(any)
  assertThrows(() => {
    Unicode.Rune.isSymbol(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isSeparator", () => {
  // isSeparator(string)
  assertStrictEquals(Unicode.Rune.isSeparator("\u0000"), false);
  assertStrictEquals(Unicode.Rune.isSeparator("a"), false);
  assertStrictEquals(Unicode.Rune.isSeparator("A"), false);
  assertStrictEquals(Unicode.Rune.isSeparator("1"), false);
  assertStrictEquals(Unicode.Rune.isSeparator("="), false);
  assertStrictEquals(Unicode.Rune.isSeparator(" "), true);

  assertThrows(() => {
    Unicode.Rune.isSeparator("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isSeparator(any)
  assertThrows(() => {
    Unicode.Rune.isSeparator(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isControl", () => {
  // isControl(string)
  assertStrictEquals(Unicode.Rune.isControl("\u0000"), true);
  assertStrictEquals(Unicode.Rune.isControl("\u001F"), true);
  assertStrictEquals(Unicode.Rune.isControl("\u0020"), false);
  assertStrictEquals(Unicode.Rune.isControl("\u007E"), false);
  assertStrictEquals(Unicode.Rune.isControl("\u007F"), true);
  assertStrictEquals(Unicode.Rune.isControl("\u0080"), true);
  assertStrictEquals(Unicode.Rune.isControl("\u009F"), true);
  assertStrictEquals(Unicode.Rune.isControl("\u00A0"), false);
  assertStrictEquals(Unicode.Rune.isControl("\u{10FFFF}"), false);

  assertThrows(() => {
    Unicode.Rune.isControl("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isControl(any)
  assertThrows(() => {
    Unicode.Rune.isControl(0 as unknown as string);
  }, TypeError, undefined, "rune");
});

Deno.test("Unicode.Rune.isSurrogate", () => {
  // isSurrogate(string)
  assertStrictEquals(Unicode.Rune.isSurrogate("\u0000"), false);
  assertStrictEquals(Unicode.Rune.isSurrogate("\u{10FFFF}"), false);
  assertStrictEquals(Unicode.Rune.isSurrogate("\uD7FF"), false);
  assertStrictEquals(Unicode.Rune.isSurrogate("\uD800"), true);
  assertStrictEquals(Unicode.Rune.isSurrogate("\uDBFF"), true);
  assertStrictEquals(Unicode.Rune.isSurrogate("\uDC00"), true);
  assertStrictEquals(Unicode.Rune.isSurrogate("\uDFFF"), true);
  assertStrictEquals(Unicode.Rune.isSurrogate("\uE000"), false);

  assertThrows(() => {
    Unicode.Rune.isSurrogate("\u0000\u0000");
  }, TypeError, undefined, "rune");

  // isSurrogate(any)
  assertThrows(() => {
    Unicode.Rune.isSurrogate(0 as unknown as string);
  }, TypeError, undefined, "rune");
});
