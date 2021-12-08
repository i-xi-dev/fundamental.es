import assert from "node:assert";
import { Progress } from "../../../dist/index.js";

describe("Progress", () => {
  it("new Progress()", () => {
    const i1 = new Progress();
    const r1 = [];
    i1.addEventListener("loadstart", (e) => {r1.push(e);});
    i1.addEventListener("loadend", (e) => {r1.push(e);});
    i1.addEventListener("load", (e) => {r1.push(e);});
    i1.addEventListener("error", (e) => {r1.push(e);});
    i1.addEventListener("abort", (e) => {r1.push(e);});
    i1.addEventListener("timeout", (e) => {r1.push(e);});
    i1.addEventListener("progress", (e) => {r1.push(e);});
    i1.start();
    assert.strictEqual(r1[0].loaded, 0);
    assert.strictEqual(r1[0].total, 0);
    assert.strictEqual(r1[0].lengthComputable, false);

  });

  it("new Progress({total:number})", () => {
    const i1 = new Progress({total:10});
    const r1 = [];
    i1.addEventListener("loadstart", (e) => {r1.push(e);});
    i1.addEventListener("loadend", (e) => {r1.push(e);});
    i1.addEventListener("load", (e) => {r1.push(e);});
    i1.addEventListener("error", (e) => {r1.push(e);});
    i1.addEventListener("abort", (e) => {r1.push(e);});
    i1.addEventListener("timeout", (e) => {r1.push(e);});
    i1.addEventListener("progress", (e) => {r1.push(e);});
    i1.start();
    assert.strictEqual(r1[0].loaded, 0);
    assert.strictEqual(r1[0].total, 10);
    assert.strictEqual(r1[0].lengthComputable, true);

  });

  it("new Progress({total:0})", () => {
    const i1 = new Progress({total:0});
    const r1 = [];
    i1.addEventListener("loadstart", (e) => {r1.push(e);});
    i1.addEventListener("loadend", (e) => {r1.push(e);});
    i1.addEventListener("load", (e) => {r1.push(e);});
    i1.addEventListener("error", (e) => {r1.push(e);});
    i1.addEventListener("abort", (e) => {r1.push(e);});
    i1.addEventListener("timeout", (e) => {r1.push(e);});
    i1.addEventListener("progress", (e) => {r1.push(e);});
    i1.start();
    assert.strictEqual(r1[0].loaded, 0);
    assert.strictEqual(r1[0].total, 0);
    assert.strictEqual(r1[0].lengthComputable, true);

  });

  it("new Progress({timeout:number})", () => {
//TODO
  });

  it("new Progress({signal:AbortSignal})", () => {
//TODO
  });

});
