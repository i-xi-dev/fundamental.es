import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

describe("StringUtils.collectHttpQuotedStringStart", () => {
  it("collectHttpQuotedStringStart(string)", () => {
    const r1 = StringUtils.collectHttpQuotedStringStart("");
    assert.strictEqual(r1.value, "");
    assert.strictEqual(r1.length, 0);

    const r2 = StringUtils.collectHttpQuotedStringStart('"\\');
    assert.strictEqual(r2.value, "\u005C");
    assert.strictEqual(r2.length, 2);

    const r3 = StringUtils.collectHttpQuotedStringStart('"Hello" World');
    assert.strictEqual(r3.value, "Hello");
    assert.strictEqual(r3.length, 7);

    const r4 = StringUtils.collectHttpQuotedStringStart('"Hello \\\\ World\\""');
    assert.strictEqual(r4.value, 'Hello \u005C World"');
    assert.strictEqual(r4.length, 18);

  });

});
