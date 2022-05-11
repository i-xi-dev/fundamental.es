import { assertStrictEquals } from "std/testing/asserts";
import { AbortError, InvalidStateError, TimeoutError } from "../src/error.ts";

Deno.test("AbortError", () => {
  // new AbortError()
  const error1 = new AbortError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "AbortError");
  assertStrictEquals(error1.message, "");

  // new AbortError(string)
  const error2 = new AbortError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "AbortError");
  assertStrictEquals(error2.message, "a123");
});

Deno.test("InvalidStateError", () => {
  // new InvalidStateError()
  const error1 = new InvalidStateError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "InvalidStateError");
  assertStrictEquals(error1.message, "");

  // new InvalidStateError(string)
  const error2 = new InvalidStateError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "InvalidStateError");
  assertStrictEquals(error2.message, "a123");
});

Deno.test("TimeoutError", () => {
  // new TimeoutError()
  const error1 = new TimeoutError();
  assertStrictEquals(error1 instanceof Error, true);
  assertStrictEquals(error1.name, "TimeoutError");
  assertStrictEquals(error1.message, "");

  // new TimeoutError(string)
  const error2 = new TimeoutError("a123");
  assertStrictEquals(error2 instanceof Error, true);
  assertStrictEquals(error2.name, "TimeoutError");
  assertStrictEquals(error2.message, "a123");
});
