import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.essence", () => {
  const i0 = Resource.MediaType.fromString("text/plain;charset=utf-8");
  assertStrictEquals(i0.essence, "text/plain");
});
