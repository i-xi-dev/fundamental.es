import assert from "node:assert";
import { AbortError, TimeoutError } from "../../dist/index.js";

describe("AbortError", () => {
  it("new AbortError()", () => {
    const error = new AbortError();

    assert.strictEqual(error instanceof Error, true);
    assert.strictEqual(error.name, "AbortError");
    assert.strictEqual(error.message, "");

  });

  it("new AbortError(string)", () => {
    const error = new AbortError("a123");

    assert.strictEqual(error instanceof Error, true);
    assert.strictEqual(error.name, "AbortError");
    assert.strictEqual(error.message, "a123");

  });

});

describe("TimeoutError", () => {
  it("new TimeoutError()", () => {
    const error = new TimeoutError();

    assert.strictEqual(error instanceof Error, true);
    assert.strictEqual(error.name, "TimeoutError");
    assert.strictEqual(error.message, "");

  });

  it("new TimeoutError(string)", () => {
    const error = new TimeoutError("a123");

    assert.strictEqual(error instanceof Error, true);
    assert.strictEqual(error.name, "TimeoutError");
    assert.strictEqual(error.message, "a123");

  });

});
