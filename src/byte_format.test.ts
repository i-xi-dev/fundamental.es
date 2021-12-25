import { ByteFormat, ByteFormatRadix } from "./byte_format";

describe("ByteFormat.prototype.format", () => {
  it("new ByteFormat()/format(Uint8Array)", () => {
    const format = new ByteFormat();

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("FFFEFDFC00010203");

  });

  it("new ByteFormat(16)/format(Uint8Array)", () => {
    const format = new ByteFormat(16);

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("FFFEFDFC00010203");

  });

  it("new ByteFormat(number)/format(Uint8Array)", () => {

    expect(() => {
      new ByteFormat(15 as ByteFormatRadix);
    }).toThrowError({
      name: "TypeError",
      message: "radix",
    });

    expect(() => {
      new ByteFormat("1" as unknown as ByteFormatRadix);
    }).toThrowError({
      name: "TypeError",
      message: "radix",
    });

  });

  it("new ByteFormat(10)/format(Uint8Array)", () => {
    const format = new ByteFormat(10);

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("255254253252000001002003");

  });

  it("new ByteFormat(8)/format(Uint8Array)", () => {
    const format = new ByteFormat(8);

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("377376375374000001002003");

  });

  it("new ByteFormat(2)/format(Uint8Array)", () => {
    const format = new ByteFormat(2);

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("1111111111111110111111011111110000000000000000010000001000000011");

  });

  it("new ByteFormat(16,{upperCase:false})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{upperCase:false});

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("fffefdfc00010203");

  });

  it("new ByteFormat(16,{paddedLength:4})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{paddedLength:4});

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("00FF00FE00FD00FC0000000100020003");

    expect(() => {
      new ByteFormat(16,{paddedLength:1});
    }).toThrowError({
      name: "TypeError",
      message: "paddedLength",
    });

    expect(() => {
      new ByteFormat(16,{paddedLength:1.5});
    }).toThrowError({
      name: "TypeError",
      message: "paddedLength",
    });

  });

  it("new ByteFormat(16,{prefix:string})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{prefix:"x"});

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("xFFxFExFDxFCx00x01x02x03");

  });

  it("new ByteFormat(16,{suffix:string})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{suffix:"x"});

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("FFxFExFDxFCx00x01x02x03x");

  });

  it("new ByteFormat(16,{separator:string})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{separator:"  "});

    expect(format.format(Uint8Array.of())).toBe("");
    expect(format.format(Uint8Array.of(255,254,253,252,0,1,2,3))).toBe("FF  FE  FD  FC  00  01  02  03");

  });

});

describe("ByteFormat.prototype.parse", () => {
  it("new ByteFormat()/parse(string)", () => {
    const format = new ByteFormat();

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203")))).toBe("[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16)/parse(string)", () => {
    const format = new ByteFormat(16);

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203")))).toBe("[255,254,253,252,0,1,2,3]");
    expect(JSON.stringify(Array.from(format.parse("fffefdfc00010203")))).toBe("[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(10)/parse(string)", () => {
    const format = new ByteFormat(10);

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("255254253252000001002003")))).toBe("[255,254,253,252,0,1,2,3]");

    expect(() => {
      format.parse("0311F");
    }).toThrowError({
      name: "TypeError",
      message: "parse error: 1F",
    });

  });

  it("new ByteFormat(8)/parse(string)", () => {
    const format = new ByteFormat(8);

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("377376375374000001002003")))).toBe("[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(2)/parse(string)", () => {
    const format = new ByteFormat(2);

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("1111111111111110111111011111110000000000000000010000001000000011")))).toBe("[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{upperCase:false})/parse(string)", () => {
    const format = new ByteFormat(16,{upperCase:false});

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203")))).toBe("[255,254,253,252,0,1,2,3]");
    expect(JSON.stringify(Array.from(format.parse("fffefdfc00010203")))).toBe("[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{paddedLength:4})/parse(string)", () => {
    const format = new ByteFormat(16,{paddedLength:4});

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("00FF00FE00FD00FC0000000100020003")))).toBe("[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{prefix:string})/parse(string)", () => {
    const format = new ByteFormat(16,{prefix:"x"});

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("xFFxFExFDxFCx00x01x02x03")))).toBe("[255,254,253,252,0,1,2,3]");

    expect(() => {
      format.parse("xFFyFE");
    }).toThrowError({
      name: "TypeError",
      message: "unprefixed",
    });

    expect(() => {
      format.parse("xFFFE");
    }).toThrowError({
      name: "TypeError",
      message: "unprefixed",
    });

  });

  it("new ByteFormat(16,{suffix:string})/parse(string)", () => {
    const format = new ByteFormat(16,{suffix:"x"});

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("FFxFExFDxFCx00x01x02x03x")))).toBe("[255,254,253,252,0,1,2,3]");

    expect(() => {
      format.parse("FFxFEy");
    }).toThrowError({
      name: "TypeError",
      message: "unsuffixed",
    });

    expect(() => {
      format.parse("FFxFE");
    }).toThrowError({
      name: "TypeError",
      message: "unsuffixed",
    });

  });

  it("new ByteFormat(16,{separator:string})/parse(string)", () => {
    const format = new ByteFormat(16,{separator:"  "});

    expect(JSON.stringify(Array.from(format.parse("")))).toBe("[]");
    expect(JSON.stringify(Array.from(format.parse("FF  FE  FD  FC  00  01  02  03")))).toBe("[255,254,253,252,0,1,2,3]");

  });

});
