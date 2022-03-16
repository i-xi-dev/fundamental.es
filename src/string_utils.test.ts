import { expect } from '@esm-bundle/chai';
import { UnicodeCategory } from "./unicode";
import {
  CodePointRange,
  collectStart,
  collectHttpQuotedString,
  contains,
  isCodePoint,
  isRune,
  matches,
  runeFromCodePoint,
  runeIsSurrogate,
  runeToCodePoint,
  segment,
  trim,
  trimEnd,
  trimStart,
} from "./string_utils";

describe("isCodePoint", () => {
  it("isCodePoint(number)", () => {
    expect(isCodePoint(-1)).to.equal(false);
    expect(isCodePoint(-0)).to.equal(true);
    expect(isCodePoint(0)).to.equal(true);
    expect(isCodePoint(1_114_111)).to.equal(true);
    expect(isCodePoint(1_114_112)).to.equal(false);
    expect(isCodePoint(0.1)).to.equal(false);

  });

  it("isCodePoint(any)", () => {
    expect(isCodePoint("0")).to.equal(false);
    expect(isCodePoint("1114111")).to.equal(false);
    expect(isCodePoint(true)).to.equal(false);
    expect(isCodePoint({})).to.equal(false);
    expect(isCodePoint([])).to.equal(false);
    expect(isCodePoint([0])).to.equal(false);
    expect(isCodePoint(undefined)).to.equal(false);
    expect(isCodePoint(null)).to.equal(false);

  });

});

describe("isRune", () => {
  it("isRune(string)", () => {
    expect(isRune("")).to.equal(false);
    expect(isRune("\u0000")).to.equal(true);
    expect(isRune("\uFFFF")).to.equal(true);
    expect(isRune("a")).to.equal(true);
    expect(isRune("あ")).to.equal(true);
    expect(isRune("\u{10FFFF}")).to.equal(true);
    expect(isRune("\uD800")).to.equal(true);
    expect(isRune("\uD800\uDC00")).to.equal(true);
    expect(isRune("\uD7FF\uDC00")).to.equal(false);
    expect(isRune("aa")).to.equal(false);
    expect(isRune("aaa")).to.equal(false);

  });

  it("isRune(any)", () => {
    expect(isRune(undefined)).to.equal(false);
    expect(isRune(1)).to.equal(false);

  });

});

describe("runeFromCodePoint", () => {
  it("runeFromCodePoint(number)", () => {
    expect(runeFromCodePoint(0)).to.equal("\u0000");
    expect(runeFromCodePoint(0x10FFFF)).to.equal("\u{10FFFF}");
    expect(runeFromCodePoint(0xD800)).to.equal("\uD800");

    expect(() => {
      runeFromCodePoint(-1);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

    expect(() => {
      runeFromCodePoint(0x110000);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

  });

  it("runeFromCodePoint(any)", () => {
    expect(() => {
      runeFromCodePoint(undefined as unknown as number);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

    expect(() => {
      runeFromCodePoint("0" as unknown as number);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

  });

});

describe("runeToCodePoint", () => {
  it("runeToCodePoint(string)", () => {
    expect(runeToCodePoint("\u0000")).to.equal(0x0);
    expect(runeToCodePoint("\u{10FFFF}")).to.equal(0x10FFFF);
    expect(runeToCodePoint("\uD800")).to.equal(0xD800);

    expect(() => {
      runeToCodePoint("");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

    expect(() => {
      runeToCodePoint("aa");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("runeToCodePoint(any)", () => {
    expect(() => {
      runeToCodePoint(undefined as unknown as string);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

    expect(() => {
      runeToCodePoint(0 as unknown as string);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("runeIsSurrogate", () => {
  it("runeIsSurrogate(string)", () => {
    expect(runeIsSurrogate("\u0000")).to.equal(false);
    expect(runeIsSurrogate("\u{10FFFF}")).to.equal(false);
    expect(runeIsSurrogate("\uD7FF")).to.equal(false);
    expect(runeIsSurrogate("\uD800")).to.equal(true);
    expect(runeIsSurrogate("\uDBFF")).to.equal(true);
    expect(runeIsSurrogate("\uDC00")).to.equal(true);
    expect(runeIsSurrogate("\uDFFF")).to.equal(true);
    expect(runeIsSurrogate("\uE000")).to.equal(false);

    expect(() => {
      runeIsSurrogate("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("runeIsSurrogate(any)", () => {
    expect(() => {
      runeIsSurrogate(0 as unknown as string);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("matches", () => {
  it("matches(string, CodePointRange)", () => {
    expect(matches("", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matches("\u0008", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("\t", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matches("\u000A", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("\u001F", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches(" ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matches("\u0021", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("a", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("\t      \t    ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(true);

    expect(matches("az", [[0x41,0x5A]])).to.equal(false);
    expect(matches("AZ", [[0x41,0x5A]])).to.equal(true);
    expect(matches("azAZ", [[0x41,0x5A]])).to.equal(false);
  });

  it("matches(string, UnicodeCategory[])", () => {
    expect(matches("", [ UnicodeCategory.LETTER ])).to.equal(true);

    expect(matches("a", [ UnicodeCategory.LETTER ])).to.equal(true);
    expect(matches("1", [ UnicodeCategory.LETTER ])).to.equal(false);
    expect(matches("-", [ UnicodeCategory.LETTER ])).to.equal(false);
    expect(matches("a1", [ UnicodeCategory.LETTER ])).to.equal(false);
    expect(matches("a1-", [ UnicodeCategory.LETTER ])).to.equal(false);

    expect(matches("a", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(true);
    expect(matches("1", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(true);
    expect(matches("-", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(false);
    expect(matches("a1", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(true);
    expect(matches("a1-", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(false);

  });

  it("matches(string, any)", () => {
    expect(() => {
      matches("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      matches("a", undefined as unknown as CodePointRange);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      matches("a", [[] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      matches("a", [[1,2,3] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

  });

});

describe("contains", () => {
  it("contains(string, CodePointRange)", () => {
    expect(contains("", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(false);

    expect(contains("az", [[0x41,0x5A]])).to.equal(false);
    expect(contains("AZ", [[0x41,0x5A]])).to.equal(true);
    expect(contains("azAZ", [[0x41,0x5A]])).to.equal(true);

  });

  it("contains(string, UnicodeCategory[])", () => {
    expect(contains("", [ UnicodeCategory.LETTER ])).to.equal(false);

    expect(contains("a", [ UnicodeCategory.LETTER ])).to.equal(true);
    expect(contains("1", [ UnicodeCategory.LETTER ])).to.equal(false);
    expect(contains("-", [ UnicodeCategory.LETTER ])).to.equal(false);
    expect(contains("a1", [ UnicodeCategory.LETTER ])).to.equal(true);
    expect(contains("a1-", [ UnicodeCategory.LETTER ])).to.equal(true);

    expect(contains("a", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(true);
    expect(contains("1", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(true);
    expect(contains("-", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(false);
    expect(contains("a1", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(true);
    expect(contains("a1-", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal(true);

  });

  it("contains(string, any)", () => {
    expect(() => {
      contains("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      contains("a", undefined as unknown as CodePointRange);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      contains("a", [[] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      contains("a", [[1,2,3] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

  });

});

describe("trim", () => {
  it("trim(string, CodePointRange)", () => {
    expect(trim("", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trim("X\u0008", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(trim("X\t", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\u000A", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(trim("X\u001F", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(trim("X ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\u0021", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(trim("Xa", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(trim("X\t      \t    ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\t      \t    X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

    expect(trim("\u0008X\u0008", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u0008X\u0008");
    expect(trim("\tX\t", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("\u000AX\u000A", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u000AX\u000A");
    expect(trim("\u001FX\u001F", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u001FX\u001F");
    expect(trim(" X ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("\u0021X\u0021", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u0021X\u0021");
    expect(trim("aXa", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("aXa");

    expect(trim("\t      \t    X\t      \t    ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\t      \t    X\t      \t    X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X\t      \t    X");

  });

  it("trim(string, UnicodeCategory[])", () => {
    expect(trim("", [ UnicodeCategory.LETTER ])).to.equal("");

    expect(trim("b5a5b", [ UnicodeCategory.LETTER ])).to.equal("5a5");
    expect(trim("b515b", [ UnicodeCategory.LETTER ])).to.equal("515");
    expect(trim("b5-5b", [ UnicodeCategory.LETTER ])).to.equal("5-5");
    expect(trim("b5a15b", [ UnicodeCategory.LETTER ])).to.equal("5a15");
    expect(trim("b5a1-5b", [ UnicodeCategory.LETTER ])).to.equal("5a1-5");

    expect(trim("b5a5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trim("b515b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trim("b5-5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("-");
    expect(trim("b5a15b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trim("b5a1-5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("-");

  });

  it("trim(string, any)", () => {
    expect(() => {
      trim("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trim("a", undefined as unknown as CodePointRange);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trim("a", [[] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trim("a", [[1,2,3] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

  });

});

describe("trimStart", () => {
  it("trimStart(string, CodePointRange)", () => {
    expect(trimStart("", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trimStart("\u0008X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u0008X");
    expect(trimStart("\tX", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimStart("\u000AX", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u000AX");
    expect(trimStart("\u001FX", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u001FX");
    expect(trimStart(" X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimStart("\u0021X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\u0021X");
    expect(trimStart("aX", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("aX");

    expect(trimStart("\t      \t    X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimStart("X\t      \t    X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

  });

  it("trimStart(string, UnicodeCategory[])", () => {
    expect(trimStart("", [ UnicodeCategory.LETTER ])).to.equal("");

    expect(trimStart("a5b", [ UnicodeCategory.LETTER ])).to.equal("5b");
    expect(trimStart("15b", [ UnicodeCategory.LETTER ])).to.equal("15b");
    expect(trimStart("-5b", [ UnicodeCategory.LETTER ])).to.equal("-5b");
    expect(trimStart("a15b", [ UnicodeCategory.LETTER ])).to.equal("15b");
    expect(trimStart("a1-5b", [ UnicodeCategory.LETTER ])).to.equal("1-5b");

    expect(trimStart("a5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trimStart("15b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trimStart("-5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("-5b");
    expect(trimStart("a15b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trimStart("a1-5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("-5b");

  });

  it("trimStart(string, any)", () => {
    expect(() => {
      trimStart("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimStart("a", undefined as unknown as CodePointRange);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimStart("a", [[] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimStart("a", [[1,2,3] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

  });

});

describe("trimEnd", () => {
  it("trimEnd(string, CodePointRange)", () => {
    expect(trimEnd("", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trimEnd("X\u0008", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(trimEnd("X\t", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimEnd("X\u000A", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(trimEnd("X\u001F", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(trimEnd("X ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimEnd("X\u0021", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(trimEnd("Xa", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(trimEnd("X\t      \t    ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimEnd("X\t      \t    X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

  });

  it("trimEnd(string, UnicodeCategory[])", () => {
    expect(trimEnd("", [ UnicodeCategory.LETTER ])).to.equal("");

    expect(trimEnd("b5a", [ UnicodeCategory.LETTER ])).to.equal("b5");
    expect(trimEnd("b51", [ UnicodeCategory.LETTER ])).to.equal("b51");
    expect(trimEnd("b5-", [ UnicodeCategory.LETTER ])).to.equal("b5-");
    expect(trimEnd("b5a1", [ UnicodeCategory.LETTER ])).to.equal("b5a1");
    expect(trimEnd("b5a1-", [ UnicodeCategory.LETTER ])).to.equal("b5a1-");

    expect(trimEnd("b5a", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trimEnd("b51", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trimEnd("b5-", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("b5-");
    expect(trimEnd("b5a1", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(trimEnd("b5a1-", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("b5a1-");

  });

  it("trimEnd(string, any)", () => {
    expect(() => {
      trimEnd("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimEnd("a", undefined as unknown as CodePointRange);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimEnd("a", [[] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimEnd("a", [[1,2,3] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

  });

});

describe("collectStart", () => {
  it("collectStart(string, CodePointRange)", () => {
    expect(collectStart("", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u0008", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\t", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u000A", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u001F", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u0021", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("Xa", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectStart("X\t      \t    ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\t      \t    X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectStart("\u0008X\u0008", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("\tX\t", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\t");
    expect(collectStart("\u000AX\u000A", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("\u001FX\u001F", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart(" X ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal(" ");
    expect(collectStart("\u0021X\u0021", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("aXa", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectStart("\t      \t    X\t      \t    ", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("\t      \t    ");
    expect(collectStart("X\t      \t    X\t      \t    X", CodePointRange.HTTP_TAB_OR_SPACE)).to.equal("");

  });

  it("collectStart(string, UnicodeCategory[])", () => {
    expect(collectStart("", [ UnicodeCategory.LETTER ])).to.equal("");

    expect(collectStart("a5b", [ UnicodeCategory.LETTER ])).to.equal("a");
    expect(collectStart("15b", [ UnicodeCategory.LETTER ])).to.equal("");
    expect(collectStart("-5b", [ UnicodeCategory.LETTER ])).to.equal("");
    expect(collectStart("a15b", [ UnicodeCategory.LETTER ])).to.equal("a");
    expect(collectStart("a1-5b", [ UnicodeCategory.LETTER ])).to.equal("a");

    expect(collectStart("a5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("a5b");
    expect(collectStart("15b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("15b");
    expect(collectStart("-5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("");
    expect(collectStart("a15b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("a15b");
    expect(collectStart("a1-5b", [ UnicodeCategory.LETTER, UnicodeCategory.NUMBER ])).to.equal("a1");

  });

  it("collectStart(string, any)", () => {
    expect(() => {
      collectStart("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      collectStart("a", undefined as unknown as CodePointRange);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      collectStart("a", [[] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      collectStart("a", [[1,2,3] as unknown as [number]]);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

  });

});

describe("segment", () => {
  it("segment(string, Object)", () => {
    expect(JSON.stringify(segment("", {count:1, unit:"char"}))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:1, unit:"char"}))).to.equal(`["a"]`);
    expect(JSON.stringify(segment("ab", {count:1, unit:"char"}))).to.equal(`["a","b"]`);
    expect(JSON.stringify(segment("abc", {count:1, unit:"char"}))).to.equal(`["a","b","c"]`);

    expect(JSON.stringify(segment("", {count:2, unit:"char"}))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:2, unit:"char"}))).to.equal(`["a"]`);
    expect(JSON.stringify(segment("ab", {count:2, unit:"char"}))).to.equal(`["ab"]`);
    expect(JSON.stringify(segment("abc", {count:2, unit:"char"}))).to.equal(`["ab","c"]`);

    expect(JSON.stringify(segment("", {count:3, unit:"char"}))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:3, unit:"char"}))).to.equal(`["a"]`);
    expect(JSON.stringify(segment("ab", {count:3, unit:"char"}))).to.equal(`["ab"]`);
    expect(JSON.stringify(segment("abc", {count:3, unit:"char"}))).to.equal(`["abc"]`);

    expect(JSON.stringify(segment("", {count:4, unit:"char"}))).to.equal( `[]`);
    expect(JSON.stringify(segment("a", {count:4, unit:"char"}))).to.equal(`["a"]`);
    expect(JSON.stringify(segment("ab", {count:4, unit:"char"}))).to.equal(`["ab"]`);
    expect(JSON.stringify(segment("abc", {count:4, unit:"char"}))).to.equal(`["abc"]`);

    expect(JSON.stringify(segment("", {count:1, unit:"rune"}))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:1, unit:"rune"}))).to.equal(`["a"]`);
    expect(JSON.stringify(segment("ab", {count:1, unit:"rune"}))).to.equal(`["a","b"]`);
    expect(JSON.stringify(segment("abc", {count:1, unit:"rune"}))).to.equal(`["a","b","c"]`);
    expect(JSON.stringify(segment("\u{10000}", {count:1, unit:"rune"}))).to.equal(`["\u{10000}"]`);
    expect(JSON.stringify(segment("\u{10000}b", {count:1, unit:"rune"}))).to.equal(`["\u{10000}","b"]`);
    expect(JSON.stringify(segment("a\u{10000}c", {count:1, unit:"rune"}))).to.equal(`["a","\u{10000}","c"]`);

    expect(() => {
      segment("", {count:undefined as unknown as number, unit:"char"});
    }).to.throw(TypeError, "by.count").with.property("name", "TypeError");

    expect(() => {
      segment("", {count:1.5, unit:"char"});
    }).to.throw(TypeError, "by.count").with.property("name", "TypeError");

    expect(() => {
      segment("", 0 as unknown as {count:number,unit:"char"});
    }).to.throw(TypeError, "by.count").with.property("name", "TypeError");

    expect(() => {
      segment("", {count:0, unit:"char"});
    }).to.throw(TypeError, "by.count").with.property("name", "TypeError");

    expect(() => {
      segment("", {count:1, unit:"x" as unknown as "char"});
    }).to.throw(TypeError, "by.unit").with.property("name", "TypeError");

  });

  it("segment(any, Object)", () => {
    expect(() => {
      segment(1 as unknown as string, {count:1, unit:"char"});
    }).to.throw(TypeError, "input").with.property("name", "TypeError");

  });

  it("segment(string, Object, string)", () => {
    expect(JSON.stringify(segment("", {count:1, unit:"char"},"-"))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:1, unit:"char"},"-"))).to.equal(`["a"]`);
    expect(JSON.stringify(segment("ab", {count:1, unit:"char"},"-"))).to.equal(`["a","b"]`);
    expect(JSON.stringify(segment("abc", {count:1, unit:"char"},"-"))).to.equal(`["a","b","c"]`);

    expect(JSON.stringify(segment("", {count:2, unit:"char"},"-"))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:2, unit:"char"},"-"))).to.equal(`["a-"]`);
    expect(JSON.stringify(segment("ab", {count:2, unit:"char"},"-"))).to.equal(`["ab"]`);
    expect(JSON.stringify(segment("abc", {count:2, unit:"char"},"-"))).to.equal(`["ab","c-"]`);

    expect(JSON.stringify(segment("", {count:3, unit:"char"},"-"))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:3, unit:"char"},"-"))).to.equal(`["a--"]`);
    expect(JSON.stringify(segment("ab", {count:3, unit:"char"},"-"))).to.equal(`["ab-"]`);
    expect(JSON.stringify(segment("abc", {count:3, unit:"char"},"-"))).to.equal(`["abc"]`);

    expect(JSON.stringify(segment("", {count:4, unit:"char"},"-"))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:4, unit:"char"},"-"))).to.equal(`["a---"]`);
    expect(JSON.stringify(segment("ab", {count:4, unit:"char"},"-"))).to.equal(`["ab--"]`);
    expect(JSON.stringify(segment("abc", {count:4, unit:"char"},"-"))).to.equal(`["abc-"]`);

    expect(JSON.stringify(segment("", {count:3, unit:"rune"},"\u{10001}"))).to.equal(`[]`);
    expect(JSON.stringify(segment("a", {count:3, unit:"rune"},"\u{10001}"))).to.equal(`["a\u{10001}\u{10001}"]`);
    expect(JSON.stringify(segment("a\u{10000}", {count:3, unit:"rune"},"\u{10001}"))).to.equal(`["a\u{10000}\u{10001}"]`);
    expect(JSON.stringify(segment("a\u{10000}c", {count:3, unit:"rune"},"\u{10001}"))).to.equal(`["a\u{10000}c"]`);
    expect(JSON.stringify(segment("a\u{10000}c\u{10000}", {count:3, unit:"rune"},"\u{10001}"))).to.equal(`["a\u{10000}c","\u{10000}\u{10001}\u{10001}"]`);

    expect(() => {
      segment("", {count:1, unit:"char"}, "");
    }).to.throw(TypeError, "paddingChar must be a code unit").with.property("name", "TypeError");

    expect(() => {
      segment("", {count:1, unit:"char"}, "--");
    }).to.throw(TypeError, "paddingChar must be a code unit").with.property("name", "TypeError");

    expect(() => {
      segment("", {count:1, unit:"rune"}, "");
    }).to.throw(TypeError, "paddingRune must be a code point").with.property("name", "TypeError");

    expect(() => {
      segment("", {count:1, unit:"rune"}, "--");
    }).to.throw(TypeError, "paddingRune must be a code point").with.property("name", "TypeError");

    expect(() => {
      segment("", {count:1, unit:"rune"}, "\u{10000}\u{10001}");
    }).to.throw(TypeError, "paddingRune must be a code point").with.property("name", "TypeError");

  });

  it("segment(string, Object, any)", () => {
    expect(() => {
      segment("", {count:1, unit:"char"}, 1 as unknown as string);
    }).to.throw(TypeError, "padding").with.property("name", "TypeError");

  });

});












describe("collectHttpQuotedString", () => {
  it("collectHttpQuotedString(string)", () => {
    const r1 = collectHttpQuotedString("");
    expect(r1.collected).to.equal("");
    expect(r1.progression).to.equal(0);

    const r2 = collectHttpQuotedString('"\\');
    expect(r2.collected).to.equal("\u005C");
    expect(r2.progression).to.equal(2);

    const r3 = collectHttpQuotedString('"Hello" World');
    expect(r3.collected).to.equal("Hello");
    expect(r3.progression).to.equal(7);

    const r4 = collectHttpQuotedString('"Hello \\\\ World\\""');
    expect(r4.collected).to.equal('Hello \u005C World"');
    expect(r4.progression).to.equal(18);

  });

});
