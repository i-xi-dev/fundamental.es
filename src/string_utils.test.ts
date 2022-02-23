import { expect } from '@esm-bundle/chai';
import { StringUtils } from "./string_utils";

describe("StringUtils.collectHttpQuotedString", () => {
  it("collectHttpQuotedString(string)", () => {
    const r1 = StringUtils.collectHttpQuotedString("");
    expect(r1.collected).to.equal("");
    expect(r1.progression).to.equal(0);

    const r2 = StringUtils.collectHttpQuotedString('"\\');
    expect(r2.collected).to.equal("\u005C");
    expect(r2.progression).to.equal(2);

    const r3 = StringUtils.collectHttpQuotedString('"Hello" World');
    expect(r3.collected).to.equal("Hello");
    expect(r3.progression).to.equal(7);

    const r4 = StringUtils.collectHttpQuotedString('"Hello \\\\ World\\""');
    expect(r4.collected).to.equal('Hello \u005C World"');
    expect(r4.progression).to.equal(18);

  });

});

describe("StringUtils.collect", () => {
  it("collect(string, string)", () => {
    expect(StringUtils.collect("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(StringUtils.collect("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(StringUtils.collect("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\t");
    expect(StringUtils.collect("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(" ");
    expect(StringUtils.collect("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.collect("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

    expect(StringUtils.collect("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\t      \t    ");
    expect(StringUtils.collect("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");

  });

});

describe("StringUtils.devideByLength", () => {
  it("devideByLength(string,number)", () => {
    expect(JSON.stringify(StringUtils.devideByLength("",1))).to.equal(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",1))).to.equal(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",1))).to.equal(`["a","b"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",1))).to.equal(`["a","b","c"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",2))).to.equal(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",2))).to.equal(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",2))).to.equal(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",2))).to.equal(`["ab","c"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",3))).to.equal(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",3))).to.equal(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",3))).to.equal(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",3))).to.equal(`["abc"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",4))).to.equal( `[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",4))).to.equal(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",4))).to.equal(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",4))).to.equal(`["abc"]`);

    expect(() => {
      StringUtils.devideByLength("", undefined as unknown as number);
    }).to.throw(TypeError, "segmentLength must be positive integer").with.property("name", "TypeError");

    expect(() => {
      StringUtils.devideByLength("", 0);
    }).to.throw(TypeError, "segmentLength must be positive integer").with.property("name", "TypeError");

  });

  it("devideByLength(string, number, string)", () => {
    expect(JSON.stringify(StringUtils.devideByLength("",1,"-"))).to.equal(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",1,"-"))).to.equal(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",1,"-"))).to.equal(`["a","b"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",1,"-"))).to.equal(`["a","b","c"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",2,"-"))).to.equal(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",2,"-"))).to.equal(`["a-"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",2,"-"))).to.equal(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",2,"-"))).to.equal(`["ab","c-"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",3,"-"))).to.equal(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",3,"-"))).to.equal(`["a--"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",3,"-"))).to.equal(`["ab-"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",3,"-"))).to.equal(`["abc"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",4,"-"))).to.equal(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",4,"-"))).to.equal(`["a---"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",4,"-"))).to.equal(`["ab--"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",4,"-"))).to.equal(`["abc-"]`);

    expect(() => {
      StringUtils.devideByLength("", 1, "");
    }).to.throw(TypeError, "paddingUnit must be a code unit").with.property("name", "TypeError");

    expect(() => {
      StringUtils.devideByLength("", 1, "--");
    }).to.throw(TypeError, "paddingUnit must be a code unit").with.property("name", "TypeError");

  });

});

describe("StringUtils.match", () => {
  it("match(string, string)", () => {
    expect(StringUtils.match("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(StringUtils.match("\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(StringUtils.match("\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(StringUtils.match("\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(StringUtils.match("\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(StringUtils.match(" ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(StringUtils.match("\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(StringUtils.match("a", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(false);

    expect(StringUtils.match("\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal(true);

  });

});

describe("StringUtils.trimEnd", () => {
  it("trimEnd(string, string)", () => {
    expect(StringUtils.trimEnd("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.trimEnd("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(StringUtils.trimEnd("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trimEnd("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(StringUtils.trimEnd("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(StringUtils.trimEnd("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trimEnd("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(StringUtils.trimEnd("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(StringUtils.trimEnd("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trimEnd("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

  });

});

describe("StringUtils.trim", () => {
  it("trim(string, string)", () => {
    expect(StringUtils.trim("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("");
    expect(StringUtils.trim("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(StringUtils.trim("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trim("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(StringUtils.trim("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(StringUtils.trim("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trim("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(StringUtils.trim("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(StringUtils.trim("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trim("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");


    expect(StringUtils.trim("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u0008X\u0008");
    expect(StringUtils.trim("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trim("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u000AX\u000A");
    expect(StringUtils.trim("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u001FX\u001F");
    expect(StringUtils.trim(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trim("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("\u0021X\u0021");
    expect(StringUtils.trim("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("aXa");

    expect(StringUtils.trim("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(StringUtils.trim("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X\t      \t    X");

  });

});
