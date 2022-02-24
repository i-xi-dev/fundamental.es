import { expect } from '@esm-bundle/chai';
import {
  RangePattern,
  collectPattern,
  collectHttpQuotedString,
  devideByLength,
  isCodePoint,
  isRune,
  matchPattern,
  runeFromCodePoint,
  runeToCodePoint,
  trimPattern,
  trimPatternEnd,
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

describe("collectPattern", () => {
  it("collectPattern(string, string)", () => {
    expect(collectPattern("", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("X\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("X\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("X\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("X\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("X ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("X\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("Xa", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectPattern("X\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("X\t      \t    X", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectPattern("\u0008X\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("\tX\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\t");
    expect(collectPattern("\u000AX\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("\u001FX\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern(" X ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(" ");
    expect(collectPattern("\u0021X\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectPattern("aXa", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectPattern("\t      \t    X\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\t      \t    ");
    expect(collectPattern("X\t      \t    X\t      \t    X", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

  });

});

describe("devideByLength", () => {
  it("devideByLength(string,number)", () => {
    expect(JSON.stringify(devideByLength("",1))).to.equal(`[]`);
    expect(JSON.stringify(devideByLength("a",1))).to.equal(`["a"]`);
    expect(JSON.stringify(devideByLength("ab",1))).to.equal(`["a","b"]`);
    expect(JSON.stringify(devideByLength("abc",1))).to.equal(`["a","b","c"]`);

    expect(JSON.stringify(devideByLength("",2))).to.equal(`[]`);
    expect(JSON.stringify(devideByLength("a",2))).to.equal(`["a"]`);
    expect(JSON.stringify(devideByLength("ab",2))).to.equal(`["ab"]`);
    expect(JSON.stringify(devideByLength("abc",2))).to.equal(`["ab","c"]`);

    expect(JSON.stringify(devideByLength("",3))).to.equal(`[]`);
    expect(JSON.stringify(devideByLength("a",3))).to.equal(`["a"]`);
    expect(JSON.stringify(devideByLength("ab",3))).to.equal(`["ab"]`);
    expect(JSON.stringify(devideByLength("abc",3))).to.equal(`["abc"]`);

    expect(JSON.stringify(devideByLength("",4))).to.equal( `[]`);
    expect(JSON.stringify(devideByLength("a",4))).to.equal(`["a"]`);
    expect(JSON.stringify(devideByLength("ab",4))).to.equal(`["ab"]`);
    expect(JSON.stringify(devideByLength("abc",4))).to.equal(`["abc"]`);

    expect(() => {
      devideByLength("", undefined as unknown as number);
    }).to.throw(TypeError, "segmentLength must be positive integer").with.property("name", "TypeError");

    expect(() => {
      devideByLength("", 0);
    }).to.throw(TypeError, "segmentLength must be positive integer").with.property("name", "TypeError");

  });

  it("devideByLength(string, number, string)", () => {
    expect(JSON.stringify(devideByLength("",1,"-"))).to.equal(`[]`);
    expect(JSON.stringify(devideByLength("a",1,"-"))).to.equal(`["a"]`);
    expect(JSON.stringify(devideByLength("ab",1,"-"))).to.equal(`["a","b"]`);
    expect(JSON.stringify(devideByLength("abc",1,"-"))).to.equal(`["a","b","c"]`);

    expect(JSON.stringify(devideByLength("",2,"-"))).to.equal(`[]`);
    expect(JSON.stringify(devideByLength("a",2,"-"))).to.equal(`["a-"]`);
    expect(JSON.stringify(devideByLength("ab",2,"-"))).to.equal(`["ab"]`);
    expect(JSON.stringify(devideByLength("abc",2,"-"))).to.equal(`["ab","c-"]`);

    expect(JSON.stringify(devideByLength("",3,"-"))).to.equal(`[]`);
    expect(JSON.stringify(devideByLength("a",3,"-"))).to.equal(`["a--"]`);
    expect(JSON.stringify(devideByLength("ab",3,"-"))).to.equal(`["ab-"]`);
    expect(JSON.stringify(devideByLength("abc",3,"-"))).to.equal(`["abc"]`);

    expect(JSON.stringify(devideByLength("",4,"-"))).to.equal(`[]`);
    expect(JSON.stringify(devideByLength("a",4,"-"))).to.equal(`["a---"]`);
    expect(JSON.stringify(devideByLength("ab",4,"-"))).to.equal(`["ab--"]`);
    expect(JSON.stringify(devideByLength("abc",4,"-"))).to.equal(`["abc-"]`);

    expect(() => {
      devideByLength("", 1, "");
    }).to.throw(TypeError, "paddingUnit must be a code unit").with.property("name", "TypeError");

    expect(() => {
      devideByLength("", 1, "--");
    }).to.throw(TypeError, "paddingUnit must be a code unit").with.property("name", "TypeError");

  });

});

describe("matchPattern", () => {
  it("matchPattern(string, string)", () => {
    expect(matchPattern("", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matchPattern("\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matchPattern("\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matchPattern("\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matchPattern("\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matchPattern(" ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matchPattern("\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matchPattern("a", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);

    expect(matchPattern("\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);

  });

});

describe("trimPatternEnd", () => {
  it("trimPatternEnd(string, string)", () => {
    expect(trimPatternEnd("", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trimPatternEnd("X\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(trimPatternEnd("X\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPatternEnd("X\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(trimPatternEnd("X\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(trimPatternEnd("X ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPatternEnd("X\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(trimPatternEnd("Xa", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(trimPatternEnd("X\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPatternEnd("X\t      \t    X", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

  });

});

describe("trimPattern", () => {
  it("trimPattern(string, string)", () => {
    expect(trimPattern("", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trimPattern("X\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(trimPattern("X\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPattern("X\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(trimPattern("X\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(trimPattern("X ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPattern("X\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(trimPattern("Xa", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(trimPattern("X\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPattern("X\t      \t    X", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");


    expect(trimPattern("\u0008X\u0008", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u0008X\u0008");
    expect(trimPattern("\tX\t", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPattern("\u000AX\u000A", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u000AX\u000A");
    expect(trimPattern("\u001FX\u001F", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u001FX\u001F");
    expect(trimPattern(" X ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPattern("\u0021X\u0021", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u0021X\u0021");
    expect(trimPattern("aXa", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("aXa");

    expect(trimPattern("\t      \t    X\t      \t    ", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimPattern("X\t      \t    X\t      \t    X", RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X\t      \t    X");

  });

});
