import { expect } from '@esm-bundle/chai';
import { ProgressEvent } from "./progress_event";

describe("ProgressEvent", () => {
  it("new ProgressEvent(string)", () => {
    const event = new ProgressEvent("progress-x");

    expect(event.lengthComputable).to.equal(false);
    expect(event.loaded).to.equal(0);
    expect(event.total).to.equal(0);
    expect(event.type).to.equal("progress-x");

  });

  it("new ProgressEvent(string, {})", () => {
    const event = new ProgressEvent("progress-x", {});

    expect(event.lengthComputable).to.equal(false);
    expect(event.loaded).to.equal(0);
    expect(event.total).to.equal(0);
    expect(event.type).to.equal("progress-x");

  });

  it("new ProgressEvent(string, {lengthComputable:boolean})", () => {
    const event = new ProgressEvent("progress-x", {lengthComputable:true});

    expect(event.lengthComputable).to.equal(true);
    expect(event.loaded).to.equal(0);
    expect(event.total).to.equal(0);
    expect(event.type).to.equal("progress-x");

  });

  it("new ProgressEvent(string, {loaded:number})", () => {
    const event = new ProgressEvent("progress-x", {loaded:11});

    expect(event.lengthComputable).to.equal(false);
    expect(event.loaded).to.equal(11);
    expect(event.total).to.equal(0);
    expect(event.type).to.equal("progress-x");

  });

  it("new ProgressEvent(string, {total:number})", () => {
    const event = new ProgressEvent("progress-x", {total:22});

    expect(event.lengthComputable).to.equal(false);
    expect(event.loaded).to.equal(0);
    expect(event.total).to.equal(22);
    expect(event.type).to.equal("progress-x");

  });

});
