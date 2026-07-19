import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.toJSON()", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.toJSON(), "text/plain");

  assertStrictEquals(
    JSON.stringify({ x: 1, y: i0 }),
    '{"x":1,"y":"text/plain"}',
  );
});
