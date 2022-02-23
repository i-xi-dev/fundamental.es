import assert from "node:assert";
import { StringUtils } from "../../dist/index.js";

describe("StringUtils.collectHttpQuotedString", () => {
  it("collectHttpQuotedString(string)", () => {
    const r1 = StringUtils.collectHttpQuotedString("");
    assert.strictEqual(r1.collected, "");
    assert.strictEqual(r1.progression, 0);

    const r2 = StringUtils.collectHttpQuotedString('"\\');
    assert.strictEqual(r2.collected, "\u005C");
    assert.strictEqual(r2.progression, 2);

    const r3 = StringUtils.collectHttpQuotedString('"Hello" World');
    assert.strictEqual(r3.collected, "Hello");
    assert.strictEqual(r3.progression, 7);

    const r4 = StringUtils.collectHttpQuotedString('"Hello \\\\ World\\""');
    assert.strictEqual(r4.collected, 'Hello \u005C World"');
    assert.strictEqual(r4.progression, 18);

  });

});

describe("StringUtils.collect", () => {
  it("collect(string, string)", () => {
    assert.strictEqual(StringUtils.collect("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");

    assert.strictEqual(StringUtils.collect("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");

    assert.strictEqual(StringUtils.collect("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\t");
    assert.strictEqual(StringUtils.collect("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), " ");
    assert.strictEqual(StringUtils.collect("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collect("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");

    assert.strictEqual(StringUtils.collect("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\t      \t    ");
    assert.strictEqual(StringUtils.collect("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");

  });

});

describe("StringUtils.devideByLength", () => {
  it("devideByLength(string,number)", () => {
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",1)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",1)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",1)), `["a","b"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",1)), `["a","b","c"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",2)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",2)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",2)), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",2)), `["ab","c"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",3)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",3)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",3)), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",3)), `["abc"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",4)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",4)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",4)), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",4)), `["abc"]`);

    assert.throws(() => {
      StringUtils.devideByLength("");
    }, {
      name: "TypeError",
      message: "segmentLength must be positive integer",
    });

    assert.throws(() => {
      StringUtils.devideByLength("",0);
    }, {
      name: "TypeError",
      message: "segmentLength must be positive integer",
    });

  });

  it("devideByLength(string, number, string)", () => {
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",1,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",1,"-")), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",1,"-")), `["a","b"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",1,"-")), `["a","b","c"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",2,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",2,"-")), `["a-"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",2,"-")), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",2,"-")), `["ab","c-"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",3,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",3,"-")), `["a--"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",3,"-")), `["ab-"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",3,"-")), `["abc"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",4,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",4,"-")), `["a---"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",4,"-")), `["ab--"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",4,"-")), `["abc-"]`);

    assert.throws(() => {
      StringUtils.devideByLength("",1,"");
    }, {
      name: "TypeError",
      message: "paddingUnit must be a code unit",
    });

    assert.throws(() => {
      StringUtils.devideByLength("",1,"--");
    }, {
      name: "TypeError",
      message: "paddingUnit must be a code unit",
    });

  });

});

describe("StringUtils.match", () => {
  it("match(string, string)", () => {
    assert.strictEqual(StringUtils.match("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);
    assert.strictEqual(StringUtils.match("\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match("\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);
    assert.strictEqual(StringUtils.match("\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match("\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match(" ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);
    assert.strictEqual(StringUtils.match("\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match("a", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);

    assert.strictEqual(StringUtils.match("\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);

  });

});

describe("StringUtils.trimEnd", () => {
  it("trimEnd(string, string)", () => {
    assert.strictEqual(StringUtils.trimEnd("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.trimEnd("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u0008");
    assert.strictEqual(StringUtils.trimEnd("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trimEnd("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u000A");
    assert.strictEqual(StringUtils.trimEnd("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u001F");
    assert.strictEqual(StringUtils.trimEnd("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trimEnd("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u0021");
    assert.strictEqual(StringUtils.trimEnd("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "Xa");

    assert.strictEqual(StringUtils.trimEnd("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trimEnd("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\t      \t    X");

  });

});

describe("StringUtils.trim", () => {
  it("trim(string, string)", () => {
    assert.strictEqual(StringUtils.trim("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.trim("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u0008");
    assert.strictEqual(StringUtils.trim("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u000A");
    assert.strictEqual(StringUtils.trim("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u001F");
    assert.strictEqual(StringUtils.trim("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u0021");
    assert.strictEqual(StringUtils.trim("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "Xa");

    assert.strictEqual(StringUtils.trim("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\t      \t    X");


    assert.strictEqual(StringUtils.trim("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u0008X\u0008");
    assert.strictEqual(StringUtils.trim("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u000AX\u000A");
    assert.strictEqual(StringUtils.trim("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u001FX\u001F");
    assert.strictEqual(StringUtils.trim(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u0021X\u0021");
    assert.strictEqual(StringUtils.trim("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "aXa");

    assert.strictEqual(StringUtils.trim("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\t      \t    X\t      \t    X");

  });

});
