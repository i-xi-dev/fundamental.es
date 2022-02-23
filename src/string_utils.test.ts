import { expect } from '@esm-bundle/chai';
import {
  RangePattern,
  collectPattern,
  collectHttpQuotedString,
  devideByLength,
  matchPattern,
  trimPattern,
  trimPatternEnd,
} from "./string_utils";

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
