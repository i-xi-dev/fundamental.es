import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

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
