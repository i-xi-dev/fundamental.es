import { expect } from '@esm-bundle/chai';
import { Unicode, UnicodeUtils } from "./unicode";
import {
  StringUtils,
} from "./string";

const {
  collectStart,
  contains,
  matches,
  segment,
  trim,
  trimEnd,
  trimStart,
} = StringUtils;

const HTTP_TAB_OR_SPACE = [[ 0x9 ], [ 0x20 ]] as UnicodeUtils.CodePointRange;

describe("matches", () => {
  it("matches(string, CodePointRange)", () => {
    expect(matches("", HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matches("\u0008", HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("\t", HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matches("\u000A", HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("\u001F", HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches(" ", HTTP_TAB_OR_SPACE)).to.equal(true);
    expect(matches("\u0021", HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("a", HTTP_TAB_OR_SPACE)).to.equal(false);
    expect(matches("\t      \t    ", HTTP_TAB_OR_SPACE)).to.equal(true);

    expect(matches("az", [[0x41,0x5A]])).to.equal(false);
    expect(matches("AZ", [[0x41,0x5A]])).to.equal(true);
    expect(matches("azAZ", [[0x41,0x5A]])).to.equal(false);
  });

  it("matches(string, Unicode.Category[])", () => {
    expect(matches("", [ Unicode.Category.LETTER ])).to.equal(true);

    expect(matches("a", [ Unicode.Category.LETTER ])).to.equal(true);
    expect(matches("1", [ Unicode.Category.LETTER ])).to.equal(false);
    expect(matches("-", [ Unicode.Category.LETTER ])).to.equal(false);
    expect(matches("a1", [ Unicode.Category.LETTER ])).to.equal(false);
    expect(matches("a1-", [ Unicode.Category.LETTER ])).to.equal(false);

    expect(matches("a", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(true);
    expect(matches("1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(true);
    expect(matches("-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(false);
    expect(matches("a1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(true);
    expect(matches("a1-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(false);

  });

  it("matches(string, script[])", () => {
    expect(matches("", [ "Latn" ])).to.equal(true);
    expect(matches("a", [ "Latn" ])).to.equal(true);
    expect(matches("1", [ "Latn" ])).to.equal(false);
    expect(matches("a1", [ "Latn" ])).to.equal(false);
    expect(matches("1a", [ "Latn" ])).to.equal(false);
    expect(matches("可", [ "Latn" ])).to.equal(false);
    expect(matches("可", [ "Hani" ])).to.equal(true);
    expect(matches("可a", [ "Hani" ])).to.equal(false);
    expect(matches("可a", [ "Hani","Latn" ])).to.equal(true);

    expect(matches("あ", [ "Latn" ])).to.equal(false);
    expect(matches("あ", [ "Hira" ])).to.equal(true);
    expect(matches("あ", [ "Jpan" ])).to.equal(true);
    expect(matches("あ", [ "Hrkt" ])).to.equal(true);
    expect(matches("あ", [ "Jpan","Latn" ])).to.equal(true);

    expect(matches("あa", [ "Latn" ])).to.equal(false);
    expect(matches("あa", [ "Hira" ])).to.equal(false);
    expect(matches("あa", [ "Jpan" ])).to.equal(false);
    expect(matches("あa", [ "Hrkt" ])).to.equal(false);
    expect(matches("あa", [ "Jpan","Latn" ])).to.equal(true);

    expect(matches("ア", [ "Latn" ])).to.equal(false);
    expect(matches("ア", [ "Hira" ])).to.equal(false);
    expect(matches("ア", [ "Jpan" ])).to.equal(true);
    expect(matches("ア", [ "Hrkt" ])).to.equal(true);
    expect(matches("ア", [ "Jpan","Latn" ])).to.equal(true);

    expect(matches("アa", [ "Latn" ])).to.equal(false);
    expect(matches("アa", [ "Hira" ])).to.equal(false);
    expect(matches("アa", [ "Jpan" ])).to.equal(false);
    expect(matches("アa", [ "Hrkt" ])).to.equal(false);
    expect(matches("アa", [ "Jpan","Latn" ])).to.equal(true);

    expect(matches("あア", [ "Latn" ])).to.equal(false);
    expect(matches("あア", [ "Hira" ])).to.equal(false);
    expect(matches("あア", [ "Jpan" ])).to.equal(true);
    expect(matches("あア", [ "Hrkt" ])).to.equal(true);
    expect(matches("あア", [ "Jpan","Latn" ])).to.equal(true);

    expect(matches("あアa", [ "Latn" ])).to.equal(false);
    expect(matches("あアa", [ "Hira" ])).to.equal(false);
    expect(matches("あアa", [ "Jpan" ])).to.equal(false);
    expect(matches("あアa", [ "Hrkt" ])).to.equal(false);
    expect(matches("あアa", [ "Jpan","Latn" ])).to.equal(true);

    expect(matches("あア脗", [ "Latn" ])).to.equal(false);
    expect(matches("あア脗", [ "Hira" ])).to.equal(false);
    expect(matches("あア脗", [ "Jpan" ])).to.equal(true);
    expect(matches("あア脗", [ "Hrkt" ])).to.equal(false);
    expect(matches("あア脗", [ "Jpan","Latn" ])).to.equal(true);

    expect(matches("あア脗a", [ "Latn" ])).to.equal(false);
    expect(matches("あア脗a", [ "Hira" ])).to.equal(false);
    expect(matches("あア脗a", [ "Jpan" ])).to.equal(false);
    expect(matches("あア脗a", [ "Hrkt" ])).to.equal(false);
    expect(matches("あア脗a", [ "Jpan","Latn" ])).to.equal(true);

  });

  it("matches(string, any)", () => {
    expect(() => {
      matches("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      matches("a", undefined as unknown as UnicodeUtils.CodePointRange);
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
    expect(contains("", HTTP_TAB_OR_SPACE)).to.equal(false);

    expect(contains("az", [[0x41,0x5A]])).to.equal(false);
    expect(contains("AZ", [[0x41,0x5A]])).to.equal(true);
    expect(contains("azAZ", [[0x41,0x5A]])).to.equal(true);

  });

  it("contains(string, Unicode.Category[])", () => {
    expect(contains("", [ Unicode.Category.LETTER ])).to.equal(false);

    expect(contains("a", [ Unicode.Category.LETTER ])).to.equal(true);
    expect(contains("1", [ Unicode.Category.LETTER ])).to.equal(false);
    expect(contains("-", [ Unicode.Category.LETTER ])).to.equal(false);
    expect(contains("a1", [ Unicode.Category.LETTER ])).to.equal(true);
    expect(contains("a1-", [ Unicode.Category.LETTER ])).to.equal(true);

    expect(contains("a", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(true);
    expect(contains("1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(true);
    expect(contains("-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(false);
    expect(contains("a1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(true);
    expect(contains("a1-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal(true);

  });

  it("contains(string, any)", () => {
    expect(() => {
      contains("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      contains("a", undefined as unknown as UnicodeUtils.CodePointRange);
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
    expect(trim("", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trim("X\u0008", HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(trim("X\t", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\u000A", HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(trim("X\u001F", HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(trim("X ", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\u0021", HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(trim("Xa", HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(trim("X\t      \t    ", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\t      \t    X", HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

    expect(trim("\u0008X\u0008", HTTP_TAB_OR_SPACE)).to.equal("\u0008X\u0008");
    expect(trim("\tX\t", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("\u000AX\u000A", HTTP_TAB_OR_SPACE)).to.equal("\u000AX\u000A");
    expect(trim("\u001FX\u001F", HTTP_TAB_OR_SPACE)).to.equal("\u001FX\u001F");
    expect(trim(" X ", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("\u0021X\u0021", HTTP_TAB_OR_SPACE)).to.equal("\u0021X\u0021");
    expect(trim("aXa", HTTP_TAB_OR_SPACE)).to.equal("aXa");

    expect(trim("\t      \t    X\t      \t    ", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trim("X\t      \t    X\t      \t    X", HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X\t      \t    X");

  });

  it("trim(string, Unicode.Category[])", () => {
    expect(trim("", [ Unicode.Category.LETTER ])).to.equal("");

    expect(trim("b5a5b", [ Unicode.Category.LETTER ])).to.equal("5a5");
    expect(trim("b515b", [ Unicode.Category.LETTER ])).to.equal("515");
    expect(trim("b5-5b", [ Unicode.Category.LETTER ])).to.equal("5-5");
    expect(trim("b5a15b", [ Unicode.Category.LETTER ])).to.equal("5a15");
    expect(trim("b5a1-5b", [ Unicode.Category.LETTER ])).to.equal("5a1-5");

    expect(trim("b5a5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trim("b515b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trim("b5-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("-");
    expect(trim("b5a15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trim("b5a1-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("-");

  });

  it("trim(string, any)", () => {
    expect(() => {
      trim("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trim("a", undefined as unknown as UnicodeUtils.CodePointRange);
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
    expect(trimStart("", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trimStart("\u0008X", HTTP_TAB_OR_SPACE)).to.equal("\u0008X");
    expect(trimStart("\tX", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimStart("\u000AX", HTTP_TAB_OR_SPACE)).to.equal("\u000AX");
    expect(trimStart("\u001FX", HTTP_TAB_OR_SPACE)).to.equal("\u001FX");
    expect(trimStart(" X", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimStart("\u0021X", HTTP_TAB_OR_SPACE)).to.equal("\u0021X");
    expect(trimStart("aX", HTTP_TAB_OR_SPACE)).to.equal("aX");

    expect(trimStart("\t      \t    X", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimStart("X\t      \t    X", HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

  });

  it("trimStart(string, Unicode.Category[])", () => {
    expect(trimStart("", [ Unicode.Category.LETTER ])).to.equal("");

    expect(trimStart("a5b", [ Unicode.Category.LETTER ])).to.equal("5b");
    expect(trimStart("15b", [ Unicode.Category.LETTER ])).to.equal("15b");
    expect(trimStart("-5b", [ Unicode.Category.LETTER ])).to.equal("-5b");
    expect(trimStart("a15b", [ Unicode.Category.LETTER ])).to.equal("15b");
    expect(trimStart("a1-5b", [ Unicode.Category.LETTER ])).to.equal("1-5b");

    expect(trimStart("a5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trimStart("15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trimStart("-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("-5b");
    expect(trimStart("a15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trimStart("a1-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("-5b");

  });

  it("trimStart(string, any)", () => {
    expect(() => {
      trimStart("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimStart("a", undefined as unknown as UnicodeUtils.CodePointRange);
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
    expect(trimEnd("", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(trimEnd("X\u0008", HTTP_TAB_OR_SPACE)).to.equal("X\u0008");
    expect(trimEnd("X\t", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimEnd("X\u000A", HTTP_TAB_OR_SPACE)).to.equal("X\u000A");
    expect(trimEnd("X\u001F", HTTP_TAB_OR_SPACE)).to.equal("X\u001F");
    expect(trimEnd("X ", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimEnd("X\u0021", HTTP_TAB_OR_SPACE)).to.equal("X\u0021");
    expect(trimEnd("Xa", HTTP_TAB_OR_SPACE)).to.equal("Xa");

    expect(trimEnd("X\t      \t    ", HTTP_TAB_OR_SPACE)).to.equal("X");
    expect(trimEnd("X\t      \t    X", HTTP_TAB_OR_SPACE)).to.equal("X\t      \t    X");

  });

  it("trimEnd(string, Unicode.Category[])", () => {
    expect(trimEnd("", [ Unicode.Category.LETTER ])).to.equal("");

    expect(trimEnd("b5a", [ Unicode.Category.LETTER ])).to.equal("b5");
    expect(trimEnd("b51", [ Unicode.Category.LETTER ])).to.equal("b51");
    expect(trimEnd("b5-", [ Unicode.Category.LETTER ])).to.equal("b5-");
    expect(trimEnd("b5a1", [ Unicode.Category.LETTER ])).to.equal("b5a1");
    expect(trimEnd("b5a1-", [ Unicode.Category.LETTER ])).to.equal("b5a1-");

    expect(trimEnd("b5a", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trimEnd("b51", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trimEnd("b5-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("b5-");
    expect(trimEnd("b5a1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(trimEnd("b5a1-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("b5a1-");

  });

  it("trimEnd(string, any)", () => {
    expect(() => {
      trimEnd("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      trimEnd("a", undefined as unknown as UnicodeUtils.CodePointRange);
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
    expect(collectStart("", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u0008", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\t", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u000A", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u001F", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X ", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\u0021", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("Xa", HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectStart("X\t      \t    ", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("X\t      \t    X", HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectStart("\u0008X\u0008", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("\tX\t", HTTP_TAB_OR_SPACE)).to.equal("\t");
    expect(collectStart("\u000AX\u000A", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("\u001FX\u001F", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart(" X ", HTTP_TAB_OR_SPACE)).to.equal(" ");
    expect(collectStart("\u0021X\u0021", HTTP_TAB_OR_SPACE)).to.equal("");
    expect(collectStart("aXa", HTTP_TAB_OR_SPACE)).to.equal("");

    expect(collectStart("\t      \t    X\t      \t    ", HTTP_TAB_OR_SPACE)).to.equal("\t      \t    ");
    expect(collectStart("X\t      \t    X\t      \t    X", HTTP_TAB_OR_SPACE)).to.equal("");

  });

  it("collectStart(string, Unicode.Category[])", () => {
    expect(collectStart("", [ Unicode.Category.LETTER ])).to.equal("");

    expect(collectStart("a5b", [ Unicode.Category.LETTER ])).to.equal("a");
    expect(collectStart("15b", [ Unicode.Category.LETTER ])).to.equal("");
    expect(collectStart("-5b", [ Unicode.Category.LETTER ])).to.equal("");
    expect(collectStart("a15b", [ Unicode.Category.LETTER ])).to.equal("a");
    expect(collectStart("a1-5b", [ Unicode.Category.LETTER ])).to.equal("a");

    expect(collectStart("a5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("a5b");
    expect(collectStart("15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("15b");
    expect(collectStart("-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("");
    expect(collectStart("a15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("a15b");
    expect(collectStart("a1-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ])).to.equal("a1");

  });

  it("collectStart(string, any)", () => {
    expect(() => {
      collectStart("a", []);
    }).to.throw(TypeError, "searchObject").with.property("name", "TypeError");

    expect(() => {
      collectStart("a", undefined as unknown as UnicodeUtils.CodePointRange);
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











