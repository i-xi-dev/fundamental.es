import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

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
