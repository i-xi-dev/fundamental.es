import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

describe("StringUtils.trim", () => {
  it("trim(string, string)", () => {
    assert.strictEqual(StringUtils.trim("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "");
    assert.strictEqual(StringUtils.trim("X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u0008");
    assert.strictEqual(StringUtils.trim("X\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u000A");
    assert.strictEqual(StringUtils.trim("X\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u001F");
    assert.strictEqual(StringUtils.trim("X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\u0021");
    assert.strictEqual(StringUtils.trim("Xa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "Xa");

    assert.strictEqual(StringUtils.trim("X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\t      \t    X");


    assert.strictEqual(StringUtils.trim("\u0008X\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u0008X\u0008");
    assert.strictEqual(StringUtils.trim("\tX\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("\u000AX\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u000AX\u000A");
    assert.strictEqual(StringUtils.trim("\u001FX\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u001FX\u001F");
    assert.strictEqual(StringUtils.trim(" X ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("\u0021X\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "\u0021X\u0021");
    assert.strictEqual(StringUtils.trim("aXa", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "aXa");

    assert.strictEqual(StringUtils.trim("\t      \t    X\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X");
    assert.strictEqual(StringUtils.trim("X\t      \t    X\t      \t    X", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), "X\t      \t    X\t      \t    X");

  });

});
