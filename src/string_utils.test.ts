import { expect } from '@esm-bundle/chai';
import {
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












// describe("collectHttpQuotedString", () => {
//   it("collectHttpQuotedString(string)", () => {
//     const r1 = collectHttpQuotedString("");
//     expect(r1.collected).to.equal("");
//     expect(r1.progression).to.equal(0);

//     const r2 = collectHttpQuotedString('"\\');
//     expect(r2.collected).to.equal("\u005C");
//     expect(r2.progression).to.equal(2);

//     const r3 = collectHttpQuotedString('"Hello" World');
//     expect(r3.collected).to.equal("Hello");
//     expect(r3.progression).to.equal(7);

//     const r4 = collectHttpQuotedString('"Hello \\\\ World\\""');
//     expect(r4.collected).to.equal('Hello \u005C World"');
//     expect(r4.progression).to.equal(18);

//   });

// });

// describe("collectPattern", () => {
//   it("collectPattern(string, string)", () => {
//     expect(collectPattern("", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("X\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("X\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("X\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("X\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("X ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("X\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("Xa", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

//     expect(collectPattern("X\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("X\t      \t    X", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

//     expect(collectPattern("\u0008X\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("\tX\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\t");
//     expect(collectPattern("\u000AX\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("\u001FX\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern(" X ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(" ");
//     expect(collectPattern("\u0021X\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
//     expect(collectPattern("aXa", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

//     expect(collectPattern("\t      \t    X\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\t      \t    ");
//     expect(collectPattern("X\t      \t    X\t      \t    X", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

//   });

// });

// describe("devideByLength", () => {
//   it("devideByLength(string,number)", () => {
//     expect(JSON.stringify(devideByLength("",1))).to.equal(`[]`);
//     expect(JSON.stringify(devideByLength("a",1))).to.equal(`["a"]`);
//     expect(JSON.stringify(devideByLength("ab",1))).to.equal(`["a","b"]`);
//     expect(JSON.stringify(devideByLength("abc",1))).to.equal(`["a","b","c"]`);

//     expect(JSON.stringify(devideByLength("",2))).to.equal(`[]`);
//     expect(JSON.stringify(devideByLength("a",2))).to.equal(`["a"]`);
//     expect(JSON.stringify(devideByLength("ab",2))).to.equal(`["ab"]`);
//     expect(JSON.stringify(devideByLength("abc",2))).to.equal(`["ab","c"]`);

//     expect(JSON.stringify(devideByLength("",3))).to.equal(`[]`);
//     expect(JSON.stringify(devideByLength("a",3))).to.equal(`["a"]`);
//     expect(JSON.stringify(devideByLength("ab",3))).to.equal(`["ab"]`);
//     expect(JSON.stringify(devideByLength("abc",3))).to.equal(`["abc"]`);

//     expect(JSON.stringify(devideByLength("",4))).to.equal( `[]`);
//     expect(JSON.stringify(devideByLength("a",4))).to.equal(`["a"]`);
//     expect(JSON.stringify(devideByLength("ab",4))).to.equal(`["ab"]`);
//     expect(JSON.stringify(devideByLength("abc",4))).to.equal(`["abc"]`);

//     expect(() => {
//       devideByLength("", undefined as unknown as number);
//     }).to.throw(TypeError, "segmentLength must be positive integer").with.property("name", "TypeError");

//     expect(() => {
//       devideByLength("", 0);
//     }).to.throw(TypeError, "segmentLength must be positive integer").with.property("name", "TypeError");

//   });

//   it("devideByLength(string, number, string)", () => {
//     expect(JSON.stringify(devideByLength("",1,"-"))).to.equal(`[]`);
//     expect(JSON.stringify(devideByLength("a",1,"-"))).to.equal(`["a"]`);
//     expect(JSON.stringify(devideByLength("ab",1,"-"))).to.equal(`["a","b"]`);
//     expect(JSON.stringify(devideByLength("abc",1,"-"))).to.equal(`["a","b","c"]`);

//     expect(JSON.stringify(devideByLength("",2,"-"))).to.equal(`[]`);
//     expect(JSON.stringify(devideByLength("a",2,"-"))).to.equal(`["a-"]`);
//     expect(JSON.stringify(devideByLength("ab",2,"-"))).to.equal(`["ab"]`);
//     expect(JSON.stringify(devideByLength("abc",2,"-"))).to.equal(`["ab","c-"]`);

//     expect(JSON.stringify(devideByLength("",3,"-"))).to.equal(`[]`);
//     expect(JSON.stringify(devideByLength("a",3,"-"))).to.equal(`["a--"]`);
//     expect(JSON.stringify(devideByLength("ab",3,"-"))).to.equal(`["ab-"]`);
//     expect(JSON.stringify(devideByLength("abc",3,"-"))).to.equal(`["abc"]`);

//     expect(JSON.stringify(devideByLength("",4,"-"))).to.equal(`[]`);
//     expect(JSON.stringify(devideByLength("a",4,"-"))).to.equal(`["a---"]`);
//     expect(JSON.stringify(devideByLength("ab",4,"-"))).to.equal(`["ab--"]`);
//     expect(JSON.stringify(devideByLength("abc",4,"-"))).to.equal(`["abc-"]`);

//     expect(() => {
//       devideByLength("", 1, "");
//     }).to.throw(TypeError, "paddingUnit must be a code unit").with.property("name", "TypeError");

//     expect(() => {
//       devideByLength("", 1, "--");
//     }).to.throw(TypeError, "paddingUnit must be a code unit").with.property("name", "TypeError");

//   });

// });
