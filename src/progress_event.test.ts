import { ProgressEvent } from "./progress_event";

describe("ProgressEvent", () => {
  it("new ProgressEvent(string)", () => {
    const event = new ProgressEvent("progress-x");

    expect(event.lengthComputable).toBe(false);
    expect(event.loaded).toBe(0);
    expect(event.total).toBe(0);
    expect(event.type).toBe("progress-x");

  });

  it("new ProgressEvent(string, {})", () => {
    const event = new ProgressEvent("progress-x", {});

    expect(event.lengthComputable).toBe(false);
    expect(event.loaded).toBe(0);
    expect(event.total).toBe(0);
    expect(event.type).toBe("progress-x");

  });

  it("new ProgressEvent(string, {lengthComputable:boolean})", () => {
    const event = new ProgressEvent("progress-x", {lengthComputable:true});

    expect(event.lengthComputable).toBe(true);
    expect(event.loaded).toBe(0);
    expect(event.total).toBe(0);
    expect(event.type).toBe("progress-x");

  });

  it("new ProgressEvent(string, {loaded:number})", () => {
    const event = new ProgressEvent("progress-x", {loaded:11});

    expect(event.lengthComputable).toBe(false);
    expect(event.loaded).toBe(11);
    expect(event.total).toBe(0);
    expect(event.type).toBe("progress-x");

  });

  it("new ProgressEvent(string, {total:number})", () => {
    const event = new ProgressEvent("progress-x", {total:22});

    expect(event.lengthComputable).toBe(false);
    expect(event.loaded).toBe(0);
    expect(event.total).toBe(22);
    expect(event.type).toBe("progress-x");

  });

});
