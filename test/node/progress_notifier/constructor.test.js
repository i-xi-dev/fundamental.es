import assert from "node:assert";
import { ProgressNotifier } from "../../../dist/index.js";

describe("ProgressNotifier", () => {
  it("new ProgressNotifier()", () => {
    const i1 = new ProgressNotifier();
    const t1 = i1.target;
    const r1 = [];
    t1.addEventListener("loadstart", (e) => {r1.push(e);});
    t1.addEventListener("loadend", (e) => {r1.push(e);});
    t1.addEventListener("load", (e) => {r1.push(e);});
    t1.addEventListener("error", (e) => {r1.push(e);});
    t1.addEventListener("abort", (e) => {r1.push(e);});
    t1.addEventListener("timeout", (e) => {r1.push(e);});
    t1.addEventListener("progress", (e) => {r1.push(e);});
    i1.notifyStart(1);
    assert.strictEqual(r1[0].loaded, 1);
    assert.strictEqual(r1[0].total, 0);
    assert.strictEqual(r1[0].lengthComputable, false);

  });

  it("new ProgressNotifier(number)", () => {
    const i1 = new ProgressNotifier(10);
    const t1 = i1.target;
    const r1 = [];
    t1.addEventListener("loadstart", (e) => {r1.push(e);});
    t1.addEventListener("loadend", (e) => {r1.push(e);});
    t1.addEventListener("load", (e) => {r1.push(e);});
    t1.addEventListener("error", (e) => {r1.push(e);});
    t1.addEventListener("abort", (e) => {r1.push(e);});
    t1.addEventListener("timeout", (e) => {r1.push(e);});
    t1.addEventListener("progress", (e) => {r1.push(e);});
    i1.notifyStart(1);
    assert.strictEqual(r1[0].loaded, 1);
    assert.strictEqual(r1[0].total, 10);
    assert.strictEqual(r1[0].lengthComputable, true);

  });

  it("new ProgressNotifier(0)", () => {
    const i1 = new ProgressNotifier(0);
    const t1 = i1.target;
    const r1 = [];
    t1.addEventListener("loadstart", (e) => {r1.push(e);});
    t1.addEventListener("loadend", (e) => {r1.push(e);});
    t1.addEventListener("load", (e) => {r1.push(e);});
    t1.addEventListener("error", (e) => {r1.push(e);});
    t1.addEventListener("abort", (e) => {r1.push(e);});
    t1.addEventListener("timeout", (e) => {r1.push(e);});
    t1.addEventListener("progress", (e) => {r1.push(e);});
    i1.notifyStart(1);
    assert.strictEqual(r1[0].loaded, 1);
    assert.strictEqual(r1[0].total, 0);
    assert.strictEqual(r1[0].lengthComputable, false);

  });

  it("new ProgressNotifier(undefined, EventTarget)", () => {
    const t1 = new EventTarget();
    const r1 = [];
    t1.addEventListener("loadstart", (e) => {r1.push(e);});
    t1.addEventListener("loadend", (e) => {r1.push(e);});
    t1.addEventListener("load", (e) => {r1.push(e);});
    t1.addEventListener("error", (e) => {r1.push(e);});
    t1.addEventListener("abort", (e) => {r1.push(e);});
    t1.addEventListener("timeout", (e) => {r1.push(e);});
    t1.addEventListener("progress", (e) => {r1.push(e);});
    const i1 = new ProgressNotifier(undefined, t1);
    i1.notifyStart(1);
    assert.strictEqual(r1[0].loaded, 1);
    assert.strictEqual(r1[0].total, 0);
    assert.strictEqual(r1[0].lengthComputable, false);

  });

  it("new ProgressNotifier(number, EventTarget)", () => {
    const t1 = new EventTarget();
    const r1 = [];
    t1.addEventListener("loadstart", (e) => {r1.push(e);});
    t1.addEventListener("loadend", (e) => {r1.push(e);});
    t1.addEventListener("load", (e) => {r1.push(e);});
    t1.addEventListener("error", (e) => {r1.push(e);});
    t1.addEventListener("abort", (e) => {r1.push(e);});
    t1.addEventListener("timeout", (e) => {r1.push(e);});
    t1.addEventListener("progress", (e) => {r1.push(e);});
    const i1 = new ProgressNotifier(10, t1);
    i1.notifyStart(1);
    assert.strictEqual(r1[0].loaded, 1);
    assert.strictEqual(r1[0].total, 10);
    assert.strictEqual(r1[0].lengthComputable, true);

  });

  it("new ProgressNotifier(0, EventTarget)", () => {
    const t1 = new EventTarget();
    const r1 = [];
    t1.addEventListener("loadstart", (e) => {r1.push(e);});
    t1.addEventListener("loadend", (e) => {r1.push(e);});
    t1.addEventListener("load", (e) => {r1.push(e);});
    t1.addEventListener("error", (e) => {r1.push(e);});
    t1.addEventListener("abort", (e) => {r1.push(e);});
    t1.addEventListener("timeout", (e) => {r1.push(e);});
    t1.addEventListener("progress", (e) => {r1.push(e);});
    const i1 = new ProgressNotifier(0, t1);
    i1.notifyStart(1);
    assert.strictEqual(r1[0].loaded, 1);
    assert.strictEqual(r1[0].total, 0);
    assert.strictEqual(r1[0].lengthComputable, false);

  });

});
