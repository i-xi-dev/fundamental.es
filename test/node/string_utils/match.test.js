import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

describe("StringUtils.match", () => {
  it("match(string, string)", () => {
    assert.strictEqual(StringUtils.match("", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);
    assert.strictEqual(StringUtils.match("\u0008", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match("\t", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);
    assert.strictEqual(StringUtils.match("\u000A", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match("\u001F", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match(" ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);
    assert.strictEqual(StringUtils.match("\u0021", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);
    assert.strictEqual(StringUtils.match("a", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), false);

    assert.strictEqual(StringUtils.match("\t      \t    ", StringUtils.RangePattern.HTTP_TAB_OR_SPACE), true);

  });

});
