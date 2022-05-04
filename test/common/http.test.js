import { expect } from '@esm-bundle/chai';
import { HttpUtils } from "../../dist/index.js";

describe("collectHttpQuotedString", () => {
  it("collectHttpQuotedString(string)", () => {
    const r1 = HttpUtils.collectHttpQuotedString("");
    expect(r1.collected).to.equal("");
    expect(r1.progression).to.equal(0);

    const r2 = HttpUtils.collectHttpQuotedString('"\\');
    expect(r2.collected).to.equal("\u005C");
    expect(r2.progression).to.equal(2);

    const r3 = HttpUtils.collectHttpQuotedString('"Hello" World');
    expect(r3.collected).to.equal("Hello");
    expect(r3.progression).to.equal(7);

    const r4 = HttpUtils.collectHttpQuotedString('"Hello \\\\ World\\""');
    expect(r4.collected).to.equal('Hello \u005C World"');
    expect(r4.progression).to.equal(18);

  });

});

describe("splitHeaderValue", () => {
  it("splitHeaderValue(string)", () => {
    const r1 = HttpUtils.splitHeaderValue("");
    expect(JSON.stringify(r1)).to.equal('[]');

    const r2 = HttpUtils.splitHeaderValue("a1");
    expect(JSON.stringify(r2)).to.equal('["a1"]');

    const r3 = HttpUtils.splitHeaderValue("b,11");
    expect(JSON.stringify(r3)).to.equal('["b","11"]');

    const r4 = HttpUtils.splitHeaderValue('c,"21 22"');
    expect(JSON.stringify(r4)).to.equal('["c","\\"21 22\\""]');

    const r5 = HttpUtils.splitHeaderValue('nosniff,');
    expect(JSON.stringify(r5)).to.equal('["nosniff",""]');

    const r5b = HttpUtils.splitHeaderValue('nosniff, ');
    expect(JSON.stringify(r5b)).to.equal('["nosniff",""]');

    const r5c = HttpUtils.splitHeaderValue('text/html;", x/x');
    expect(JSON.stringify(r5c)).to.equal('["text/html;\\", x/x"]');

    const r5d = HttpUtils.splitHeaderValue('x/x;test="hi",y/y');
    expect(JSON.stringify(r5d)).to.equal('["x/x;test=\\"hi\\"","y/y"]');

    const r5e = HttpUtils.splitHeaderValue('x / x,,,1');
    expect(JSON.stringify(r5e)).to.equal('["x / x","","","1"]');

    const r5f = HttpUtils.splitHeaderValue('"1,2", 3');
    expect(JSON.stringify(r5f)).to.equal('["\\"1,2\\"","3"]');

  });

});
