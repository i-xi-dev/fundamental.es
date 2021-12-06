import assert from "node:assert";
import { TimeoutError } from "../../../dist/index.js";

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
