import { AbortError, TimeoutError } from "./error";

describe("AbortError", () => {
  it("new AbortError()", () => {
    const error = new AbortError();

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("AbortError");
    expect(error.message).toBe("");

  });

  it("new AbortError(string)", () => {
    const error = new AbortError("a123");

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("AbortError");
    expect(error.message).toBe("a123");

  });

});

describe("TimeoutError", () => {
  it("new TimeoutError()", () => {
    const error = new TimeoutError();

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("TimeoutError");
    expect(error.message).toBe("");

  });

  it("new TimeoutError(string)", () => {
    const error = new TimeoutError("a123");

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("TimeoutError");
    expect(error.message).toBe("a123");

  });

});
