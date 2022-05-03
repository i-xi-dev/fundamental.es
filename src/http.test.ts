import { expect } from '@esm-bundle/chai';
import { HttpUtils } from "./http";

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

    const r3 = HttpUtils.splitHeaderValue("a,1");
    expect(JSON.stringify(r3)).to.equal('["a","1"]');

    const r4 = HttpUtils.splitHeaderValue('a,"1 2"');
    expect(JSON.stringify(r4)).to.equal('["a","1 2"]');

  });

});
