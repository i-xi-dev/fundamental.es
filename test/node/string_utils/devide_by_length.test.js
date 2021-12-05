import assert from "node:assert";
import { StringUtils } from "../../../dist/index.js";

describe("devideByLength", () => {
  it("devideByLength(string,number)", () => {
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",1)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",1)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",1)), `["a","b"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",1)), `["a","b","c"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",2)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",2)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",2)), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",2)), `["ab","c"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",3)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",3)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",3)), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",3)), `["abc"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",4)), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",4)), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",4)), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",4)), `["abc"]`);

    assert.throws(() => {
      StringUtils.devideByLength("");
    }, {
      message: "segmentLength must be integer",
    });

    assert.throws(() => {
      StringUtils.devideByLength("",0);
    }, {
      message: "segmentLength must be positive",
    });

  });

  it("devideByLength(string,number,string)", () => {
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",1,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",1,"-")), `["a"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",1,"-")), `["a","b"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",1,"-")), `["a","b","c"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",2,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",2,"-")), `["a-"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",2,"-")), `["ab"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",2,"-")), `["ab","c-"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",3,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",3,"-")), `["a--"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",3,"-")), `["ab-"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",3,"-")), `["abc"]`);

    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("",4,"-")), `[]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("a",4,"-")), `["a---"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("ab",4,"-")), `["ab--"]`);
    assert.strictEqual(JSON.stringify(StringUtils.devideByLength("abc",4,"-")), `["abc-"]`);

    assert.throws(() => {
      StringUtils.devideByLength("",1,"");
    }, {
      message: "paddingUnit must be a code unit",
    });

    assert.throws(() => {
      StringUtils.devideByLength("",1,"--");
    }, {
      message: "paddingUnit must be a code unit",
    });

  });

});
