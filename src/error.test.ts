import { expect } from '@esm-bundle/chai';
import { AbortError, TimeoutError } from "./error";

describe("AbortError", () => {
  it("new AbortError()", () => {
    const error = new AbortError();

    expect(error instanceof Error).to.equal(true);
    expect(error.name).to.equal("AbortError");
    expect(error.message).to.equal("");

  });

  it("new AbortError(string)", () => {
    const error = new AbortError("a123");

    expect(error instanceof Error).to.equal(true);
    expect(error.name).to.equal("AbortError");
    expect(error.message).to.equal("a123");

  });

});

describe("TimeoutError", () => {
  it("new TimeoutError()", () => {
    const error = new TimeoutError();

    expect(error instanceof Error).to.equal(true);
    expect(error.name).to.equal("TimeoutError");
    expect(error.message).to.equal("");

  });

  it("new TimeoutError(string)", () => {
    const error = new TimeoutError("a123");

    expect(error instanceof Error).to.equal(true);
    expect(error.name).to.equal("TimeoutError");
    expect(error.message).to.equal("a123");

  });

});
