import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

describe("StringUtils.collectStart", () => {
  it("collectStart(string, string)", () => {
    assert.strictEqual(StringUtils.collectStart("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");

    assert.strictEqual(StringUtils.collectStart("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");


    assert.strictEqual(StringUtils.collectStart("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\t");
    assert.strictEqual(StringUtils.collectStart("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), " ");
    assert.strictEqual(StringUtils.collectStart("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.collectStart("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");

    assert.strictEqual(StringUtils.collectStart("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\t      \t    ");
    assert.strictEqual(StringUtils.collectStart("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");

  });

});
