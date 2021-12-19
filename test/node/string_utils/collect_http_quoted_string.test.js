import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

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
