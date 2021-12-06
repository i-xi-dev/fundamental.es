import assert from "node:assert";
import { AbortError } from "../../../dist/index.js";

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
