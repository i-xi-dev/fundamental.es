import assert from "node:assert";
import { ProgressEvent } from "../../../dist/index.js";

describe("ProgressEvent", () => {
  it("new ProgressEvent(string)", () => {
    const event = new ProgressEvent("progress-x");

    assert.strictEqual(event.lengthComputable, false);
    assert.strictEqual(event.loaded, 0);
    assert.strictEqual(event.total, 0);
    assert.strictEqual(event.type, "progress-x");

  });

  it("new ProgressEvent(string, {})", () => {
    const event = new ProgressEvent("progress-x", {});

    assert.strictEqual(event.lengthComputable, false);
    assert.strictEqual(event.loaded, 0);
    assert.strictEqual(event.total, 0);
    assert.strictEqual(event.type, "progress-x");

  });

  it("new ProgressEvent(string, {lengthComputable:boolean})", () => {
    const event = new ProgressEvent("progress-x", {lengthComputable:true});

    assert.strictEqual(event.lengthComputable, true);
    assert.strictEqual(event.loaded, 0);
    assert.strictEqual(event.total, 0);
    assert.strictEqual(event.type, "progress-x");

  });

  it("new ProgressEvent(string, {loaded:number})", () => {
    const event = new ProgressEvent("progress-x", {loaded:11});

    assert.strictEqual(event.lengthComputable, false);
    assert.strictEqual(event.loaded, 11);
    assert.strictEqual(event.total, 0);
    assert.strictEqual(event.type, "progress-x");

  });

  it("new ProgressEvent(string, {total:number})", () => {
    const event = new ProgressEvent("progress-x", {total:22});

    assert.strictEqual(event.lengthComputable, false);
    assert.strictEqual(event.loaded, 0);
    assert.strictEqual(event.total, 22);
    assert.strictEqual(event.type, "progress-x");

  });

});
