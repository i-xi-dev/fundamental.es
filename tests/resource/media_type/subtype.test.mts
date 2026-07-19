import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.subtype", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.subtype, "plain");

  const i0b = Resource.MediaType.fromString("text/PLAIN");
  assertStrictEquals(i0b.subtype, "plain");

  const i0c = Resource.MediaType.fromString("image/svg+xml");
  assertStrictEquals(i0c.subtype, "svg+xml");
});
