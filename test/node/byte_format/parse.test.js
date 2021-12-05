import assert from "node:assert";
import { ByteFormat } from "../../../dist/index.js";

describe("parse", () => {
  it("new ByteFormat()/parse(string)", () => {
    const format = new ByteFormat();

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16)/parse(string)", () => {
    const format = new ByteFormat(16);

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("fffefdfc00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(10)/parse(string)", () => {
    const format = new ByteFormat(10);

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("255254253252000001002003"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(8)/parse(string)", () => {
    const format = new ByteFormat(8);

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("377376375374000001002003"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(2)/parse(string)", () => {
    const format = new ByteFormat(2);

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("1111111111111110111111011111110000000000000000010000001000000011"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{upperCase:false})/parse(string)", () => {
    const format = new ByteFormat(16,{upperCase:false});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFFEFDFC00010203"))), "[255,254,253,252,0,1,2,3]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("fffefdfc00010203"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{paddedLength:4})/parse(string)", () => {
    const format = new ByteFormat(16,{paddedLength:4});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("00FF00FE00FD00FC0000000100020003"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{prefix:string})/parse(string)", () => {
    const format = new ByteFormat(16,{prefix:"x"});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("xFFxFExFDxFCx00x01x02x03"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{suffix:string})/parse(string)", () => {
    const format = new ByteFormat(16,{suffix:"x"});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FFxFExFDxFCx00x01x02x03x"))), "[255,254,253,252,0,1,2,3]");

  });

  it("new ByteFormat(16,{separator:string})/parse(string)", () => {
    const format = new ByteFormat(16,{separator:"  "});

    assert.strictEqual(JSON.stringify(Array.from(format.parse(""))), "[]");
    assert.strictEqual(JSON.stringify(Array.from(format.parse("FF  FE  FD  FC  00  01  02  03"))), "[255,254,253,252,0,1,2,3]");

  });

});
