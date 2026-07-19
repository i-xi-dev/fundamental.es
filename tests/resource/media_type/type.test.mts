import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.type", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.type, "text");
});
