import assert from "node:assert";
import { ByteFormat } from "../../../dist/index.js";

describe("format", () => {
  it("new ByteFormat()/format(Uint8Array)", () => {
    const format = new ByteFormat();

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFFEFDFC00010203");

  });

  it("new ByteFormat(16)/format(Uint8Array)", () => {
    const format = new ByteFormat(16);

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFFEFDFC00010203");

  });

  it("new ByteFormat(10)/format(Uint8Array)", () => {
    const format = new ByteFormat(10);

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "255254253252000001002003");

  });

  it("new ByteFormat(8)/format(Uint8Array)", () => {
    const format = new ByteFormat(8);

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "377376375374000001002003");

  });

  it("new ByteFormat(2)/format(Uint8Array)", () => {
    const format = new ByteFormat(2);

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "1111111111111110111111011111110000000000000000010000001000000011");

  });

  it("new ByteFormat(16,{upperCase:false})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{upperCase:false});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "fffefdfc00010203");

  });

  it("new ByteFormat(16,{paddedLength:4})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{paddedLength:4});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "00FF00FE00FD00FC0000000100020003");

    assert.throws(() => {
      new ByteFormat(16,{paddedLength:1});
    }, {
      message: "paddedLength",
    });

    assert.throws(() => {
      new ByteFormat(16,{paddedLength:1.5});
    }, {
      message: "paddedLength",
    });

  });

  it("new ByteFormat(16,{prefix:string})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{prefix:"x"});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "xFFxFExFDxFCx00x01x02x03");

  });

  it("new ByteFormat(16,{suffix:string})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{suffix:"x"});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FFxFExFDxFCx00x01x02x03x");

  });

  it("new ByteFormat(16,{separator:string})/format(Uint8Array)", () => {
    const format = new ByteFormat(16,{separator:"  "});

    assert.strictEqual(format.format(Uint8Array.of()), "");
    assert.strictEqual(format.format(Uint8Array.of(255,254,253,252,0,1,2,3)), "FF  FE  FD  FC  00  01  02  03");

  });

});
