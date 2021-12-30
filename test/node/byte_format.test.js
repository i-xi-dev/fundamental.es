import assert from "node:assert";
import { ByteFormat, BytesFormatter, BytesParser } from "../../dist/index.js";

describe("ByteFormat.format", () => {
  it("format(Uint8Array)", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of()), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFFEFDFC00010203");

  });

  it("format(Uint8Array, {radix:16})", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {radix:16}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {radix:16}), "FFFEFDFC00010203");

  });

  it("format(Uint8Array, {radix:*})", () => {

    assert.throws(() => {
      ByteFormat.parse("0311F", {radix:1.5});
    }, {
      name: "TypeError",
      message: "radix",
    });

    assert.throws(() => {
      ByteFormat.parse("0311F", {radix:15});
    }, {
      name: "TypeError",
      message: "radix",
    });

    assert.throws(() => {
      ByteFormat.parse("0311F", {radix:"1"});
    }, {
      name: "TypeError",
      message: "radix",
    });

  });

  it("format(Uint8Array, {radix:10})", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {radix:10}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {radix:10}), "255254253252000001002003");

  });

  it("format(Uint8Array, {radix:8})", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {radix:8}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {radix:8}), "377376375374000001002003");

  });

  it("format(Uint8Array, {radix:2})", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {radix:2}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {radix:2}), "1111111111111110111111011111110000000000000000010000001000000011");

  });

  it("format(Uint8Array, {upperCase:false})", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {upperCase:false}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {upperCase:false}), "fffefdfc00010203");

  });

  it("new ByteFormat(16, {paddedLength:4})/format(Uint8Array)", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {paddedLength:4}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {paddedLength:4}), "00FF00FE00FD00FC0000000100020003");

    assert.throws(() => {
      ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {paddedLength:1});
    }, {
      name: "RangeError",
      message: "paddedLength",
    });

    assert.throws(() => {
      ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {paddedLength:1.5});
    }, {
      name: "TypeError",
      message: "paddedLength",
    });

    assert.throws(() => {
      ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {paddedLength:"1"});
    }, {
      name: "TypeError",
      message: "paddedLength",
    });

  });

  it("new ByteFormat(16,{prefix:string})/format(Uint8Array)", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {prefix:"x"}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {prefix:"x"}), "xFFxFExFDxFCx00x01x02x03");

  });

  it("new ByteFormat(16,{suffix:string})/format(Uint8Array)", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {suffix:"x"}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {suffix:"x"}), "FFxFExFDxFCx00x01x02x03x");

  });

  it("new ByteFormat(16,{separator:string})/format(Uint8Array)", () => {
    assert.strictEqual(ByteFormat.format(Uint8Array.of(), {separator:"  "}), "");
    assert.strictEqual(ByteFormat.format(Uint8Array.of(255,254,253,252,0,1,2,3), {separator:"  "}), "FF  FE  FD  FC  00  01  02  03");

  });

});

describe("ByteFormat.parse", () => {
  it("parse(string)", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("parse(string, {radix:16})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {radix:16}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("FFFEFDFC00010203", {radix:16}))), "[255,254,253,252,0,1,2,3]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("fffefdfc00010203", {radix:16}))), "[255,254,253,252,0,1,2,3]");

  });

  it("parse(string, {radix:10})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {radix:10}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("255254253252000001002003", {radix:10}))), "[255,254,253,252,0,1,2,3]");

    assert.throws(() => {
      ByteFormat.parse("0311F", {radix:10});
    }, {
      name: "TypeError",
      message: "parse error: 1F",
    });

  });

  it("parse(string, {radix:8})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {radix:8}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("377376375374000001002003", {radix:8}))), "[255,254,253,252,0,1,2,3]");

  });

  it("parse(string, {radix:2})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {radix:2}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("1111111111111110111111011111110000000000000000010000001000000011", {radix:2}))), "[255,254,253,252,0,1,2,3]");

  });

  it("parse(string, {upperCase:false})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {upperCase:false}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("FFFEFDFC00010203", {upperCase:false}))), "[255,254,253,252,0,1,2,3]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("fffefdfc00010203", {upperCase:false}))), "[255,254,253,252,0,1,2,3]");

  });

  it("parse(string, {paddedLength:4})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {paddedLength:4}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("00FF00FE00FD00FC0000000100020003", {paddedLength:4}))), "[255,254,253,252,0,1,2,3]");

  });

  it("parse(string, {prefix:string})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {prefix:"x"}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("xFFxFExFDxFCx00x01x02x03", {prefix:"x"}))), "[255,254,253,252,0,1,2,3]");

    assert.throws(() => {
      ByteFormat.parse("xFFyFE", {prefix:"x"});
    }, {
      name: "TypeError",
      message: "unprefixed",
    });

    assert.throws(() => {
      ByteFormat.parse("xFFFE", {prefix:"x"});
    }, {
      name: "TypeError",
      message: "unprefixed",
    });

  });

  it("parse(string, {suffix:string})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {suffix:"x"}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("FFxFExFDxFCx00x01x02x03x", {suffix:"x"}))), "[255,254,253,252,0,1,2,3]");

    assert.throws(() => {
      ByteFormat.parse("FFxFEy", {suffix:"x"});
    }, {
      name: "TypeError",
      message: "unsuffixed",
    });

    assert.throws(() => {
      ByteFormat.parse("FFxFE", {suffix:"x"});
    }, {
      name: "TypeError",
      message: "unsuffixed",
    });

  });

  it("parse(string, {separator:string})", () => {
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("", {separator:"  "}))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(ByteFormat.parse("FF  FE  FD  FC  00  01  02  03", {separator:"  "}))), "[255,254,253,252,0,1,2,3]");

  });

});

describe("BytesFormatter.get", () => {
  it("get()", () => {
    const format = BytesFormatter.get();

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFFEFDFC00010203");

  });

  it("get(Object)", () => {
    const op = ByteFormat.resolveOptions({radix:10});
    const format = BytesFormatter.get(op);

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "255254253252000001002003");

    const format2 = BytesFormatter.get(op);
    assert.strictEqual(format, format2);

  });

});

describe("BytesFormatter.prototype.format", () => {
  it("new BytesFormatter()/format(Uint8Array)", () => {
    const format = new BytesFormatter();

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFFEFDFC00010203");

  });

  it("new BytesFormatter({radix:16})/format(Uint8Array)", () => {
    const format = new BytesFormatter({radix:16});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFFEFDFC00010203");

  });

  it("new BytesFormatter({radix:*})/format(Uint8Array)", () => {

    assert.throws(() => {
      new BytesFormatter({radix:15});
    }, {
      name: "TypeError",
      message: "radix",
    });

    assert.throws(() => {
      new BytesFormatter({radix:"1"});
    }, {
      name: "TypeError",
      message: "radix",
    });

  });

  it("new BytesFormatter({radix:10})/format(Uint8Array)", () => {
    const format = new BytesFormatter({radix:10});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "255254253252000001002003");

  });

  it("new BytesFormatter({radix:8})/format(Uint8Array)", () => {
    const format = new BytesFormatter({radix:8});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "377376375374000001002003");

  });

  it("new BytesFormatter({radix:2})/format(Uint8Array)", () => {
    const format = new BytesFormatter({radix:2});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "1111111111111110111111011111110000000000000000010000001000000011");

  });

  it("new BytesFormatter({upperCase:false})/format(Uint8Array)", () => {
    const format = new BytesFormatter({upperCase:false});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "fffefdfc00010203");

  });

  it("new BytesFormatter({paddedLength:4})/format(Uint8Array)", () => {
    const format = new BytesFormatter({paddedLength:4});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "00FF00FE00FD00FC0000000100020003");

    assert.throws(() => {
      new BytesFormatter({paddedLength:1});
    }, {
      name: "RangeError",
      message: "paddedLength",
    });

    assert.throws(() => {
      new BytesFormatter({paddedLength:1.5});
    }, {
      name: "TypeError",
      message: "paddedLength",
    });

  });

  it("new BytesFormatter({prefix:string})/format(Uint8Array)", () => {
    const format = new BytesFormatter({prefix:"x"});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "xFFxFExFDxFCx00x01x02x03");

  });

  it("new BytesFormatter({suffix:string})/format(Uint8Array)", () => {
    const format = new BytesFormatter({suffix:"x"});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFxFExFDxFCx00x01x02x03x");

  });

  it("new BytesFormatter({separator:string})/format(Uint8Array)", () => {
    const format = new BytesFormatter({separator:"  "});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FF  FE  FD  FC  00  01  02  03");

  });

});

describe("BytesParser.get", () => {
  it("get()", () => {
    const format = BytesParser.get();

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("get(Object)", () => {
    const op = ByteFormat.resolveOptions({radix:10});
    const format = BytesParser.get(op);

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("255254253252000001002003"))), "[255,254,253,252,0,1,2,3]");

    const format2 = BytesParser.get(op);
    assert.strictEqual(format, format2);

  });

});

describe("BytesParser.prototype.parse", () => {
  it("new BytesParser()/parse(string)", () => {
    const format = new BytesParser();

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new BytesParser({radix:16})/parse(string)", () => {
    const format = new BytesParser({radix:16});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("fffefdfc00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new BytesParser({radix:10})/parse(string)", () => {
    const format = new BytesParser({radix:10});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("255254253252000001002003"))), "[255,254,253,252,0,1,2,3]");

    assert.throws(() => {
      format.parse("0311F");
    }, {
      name: "TypeError",
      message: "parse error: 1F",
    });

  });

  it("new BytesParser({radix:8})/parse(string)", () => {
    const format = new BytesParser({radix:8});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("377376375374000001002003"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new BytesParser({radix:2})/parse(string)", () => {
    const format = new BytesParser({radix:2});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("1111111111111110111111011111110000000000000000010000001000000011"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new BytesParser({upperCase:false})/parse(string)", () => {
    const format = new BytesParser({upperCase:false});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("fffefdfc00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new BytesParser({paddedLength:4})/parse(string)", () => {
    const format = new BytesParser({paddedLength:4});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("00FF00FE00FD00FC0000000100020003"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new BytesParser({prefix:string})/parse(string)", () => {
    const format = new BytesParser({prefix:"x"});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("xFFxFExFDxFCx00x01x02x03"))), "[255,254,253,252,0,1,2,3]");

    assert.throws(() => {
      format.parse("xFFyFE");
    }, {
      name: "TypeError",
      message: "unprefixed",
    });

    assert.throws(() => {
      format.parse("xFFFE");
    }, {
      name: "TypeError",
      message: "unprefixed",
    });

  });

  it("new BytesParser({suffix:string})/parse(string)", () => {
    const format = new BytesParser({suffix:"x"});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFxFExFDxFCx00x01x02x03x"))), "[255,254,253,252,0,1,2,3]");

    assert.throws(() => {
      format.parse("FFxFEy");
    }, {
      name: "TypeError",
      message: "unsuffixed",
    });

    assert.throws(() => {
      format.parse("FFxFE");
    }, {
      name: "TypeError",
      message: "unsuffixed",
    });

  });

  it("new BytesParser({separator:string})/parse(string)", () => {
    const format = new BytesParser({separator:"  "});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FF  FE  FD  FC  00  01  02  03"))), "[255,254,253,252,0,1,2,3]");

  });

});
