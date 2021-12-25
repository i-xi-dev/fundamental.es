import { StringUtils } from "./string_utils";

describe("StringUtils.collectHttpQuotedString", () => {
  it("collectHttpQuotedString(string)", () => {
    const r1 = StringUtils.collectHttpQuotedString("");
    expect(r1.collected).toBe("");
    expect(r1.progression).toBe(0);

    const r2 = StringUtils.collectHttpQuotedString('"\\');
    expect(r2.collected).toBe("\u005C");
    expect(r2.progression).toBe(2);

    const r3 = StringUtils.collectHttpQuotedString('"Hello" World');
    expect(r3.collected).toBe("Hello");
    expect(r3.progression).toBe(7);

    const r4 = StringUtils.collectHttpQuotedString('"Hello \\\\ World\\""');
    expect(r4.collected).toBe('Hello \u005C World"');
    expect(r4.progression).toBe(18);

  });

});

describe("StringUtils.collect", () => {
  it("collect(string, string)", () => {
    expect(StringUtils.collect("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");

    expect(StringUtils.collect("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");

    expect(StringUtils.collect("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("\t");
    expect(StringUtils.collect("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(" ");
    expect(StringUtils.collect("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.collect("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");

    expect(StringUtils.collect("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("\t      \t    ");
    expect(StringUtils.collect("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");

  });

});

describe("StringUtils.devideByLength", () => {
  it("devideByLength(string,number)", () => {
    expect(JSON.stringify(StringUtils.devideByLength("",1))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",1))).toBe(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",1))).toBe(`["a","b"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",1))).toBe(`["a","b","c"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",2))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",2))).toBe(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",2))).toBe(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",2))).toBe(`["ab","c"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",3))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",3))).toBe(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",3))).toBe(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",3))).toBe(`["abc"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",4))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",4))).toBe(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",4))).toBe(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",4))).toBe(`["abc"]`);

    expect(() => {
      StringUtils.devideByLength("", undefined as unknown as number);
    }).toThrowError({
      name: "TypeError",
      message: "segmentLength must be positive integer",
    });

    expect(() => {
      StringUtils.devideByLength("",0);
    }).toThrowError({
      name: "TypeError",
      message: "segmentLength must be positive integer",
    });

  });

  it("devideByLength(string, number, string)", () => {
    expect(JSON.stringify(StringUtils.devideByLength("",1,"-"))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",1,"-"))).toBe(`["a"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",1,"-"))).toBe(`["a","b"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",1,"-"))).toBe(`["a","b","c"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",2,"-"))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",2,"-"))).toBe(`["a-"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",2,"-"))).toBe(`["ab"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",2,"-"))).toBe(`["ab","c-"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",3,"-"))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",3,"-"))).toBe(`["a--"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",3,"-"))).toBe(`["ab-"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",3,"-"))).toBe(`["abc"]`);

    expect(JSON.stringify(StringUtils.devideByLength("",4,"-"))).toBe(`[]`);
    expect(JSON.stringify(StringUtils.devideByLength("a",4,"-"))).toBe(`["a---"]`);
    expect(JSON.stringify(StringUtils.devideByLength("ab",4,"-"))).toBe(`["ab--"]`);
    expect(JSON.stringify(StringUtils.devideByLength("abc",4,"-"))).toBe(`["abc-"]`);

    expect(() => {
      StringUtils.devideByLength("",1,"");
    }).toThrowError({
      name: "TypeError",
      message: "paddingUnit must be a code unit",
    });

    expect(() => {
      StringUtils.devideByLength("",1,"--");
    }).toThrowError({
      name: "TypeError",
      message: "paddingUnit must be a code unit",
    });

  });

});

describe("StringUtils.match", () => {
  it("match(string, string)", () => {
    expect(StringUtils.match("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(true);
    expect(StringUtils.match("\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(false);
    expect(StringUtils.match("\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(true);
    expect(StringUtils.match("\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(false);
    expect(StringUtils.match("\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(false);
    expect(StringUtils.match(" ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(true);
    expect(StringUtils.match("\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(false);
    expect(StringUtils.match("a", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(false);

    expect(StringUtils.match("\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe(true);

  });

});

describe("StringUtils.trimEnd", () => {
  it("trimEnd(string, string)", () => {
    expect(StringUtils.trimEnd("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.trimEnd("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u0008");
    expect(StringUtils.trimEnd("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trimEnd("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u000A");
    expect(StringUtils.trimEnd("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u001F");
    expect(StringUtils.trimEnd("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trimEnd("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u0021");
    expect(StringUtils.trimEnd("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("Xa");

    expect(StringUtils.trimEnd("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trimEnd("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\t      \t    X");

  });

});

describe("StringUtils.trim", () => {
  it("trim(string, string)", () => {
    expect(StringUtils.trim("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("");
    expect(StringUtils.trim("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u0008");
    expect(StringUtils.trim("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trim("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u000A");
    expect(StringUtils.trim("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u001F");
    expect(StringUtils.trim("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trim("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\u0021");
    expect(StringUtils.trim("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("Xa");

    expect(StringUtils.trim("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trim("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\t      \t    X");


    expect(StringUtils.trim("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("\u0008X\u0008");
    expect(StringUtils.trim("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trim("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("\u000AX\u000A");
    expect(StringUtils.trim("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("\u001FX\u001F");
    expect(StringUtils.trim(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trim("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("\u0021X\u0021");
    expect(StringUtils.trim("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("aXa");

    expect(StringUtils.trim("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X");
    expect(StringUtils.trim("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE)).toBe("X\t      \t    X\t      \t    X");

  });

});
