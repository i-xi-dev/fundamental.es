import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.suffix", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.suffix, "");

  const i0b = Resource.MediaType.fromString("text/PLAIN");
  assertStrictEquals(i0b.suffix, "");

  const i0c = Resource.MediaType.fromString("image/svg+xml");
  assertStrictEquals(i0c.suffix, "+xml");

  const i0d = Resource.MediaType.fromString("example/aaa+bbb+ccc");
  assertStrictEquals(i0d.suffix, "+ccc");
});
