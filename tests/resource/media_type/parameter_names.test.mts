import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.parameterNames()", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(JSON.stringify([...i0.parameterNames()]), "[]");

  const i0b = Resource.MediaType.fromString("text/plain;charset=utf-8");
  assertStrictEquals(JSON.stringify([...i0b.parameterNames()]), '["charset"]');

  const i0c = Resource.MediaType.fromString("text/plain;charset=utf-8; a=,");
  assertStrictEquals(
    JSON.stringify([...i0c.parameterNames()]),
    '["a","charset"]',
  );

  let i = 0;
  for (const p of i0c.parameterNames()) {
    if (i === 0) {
      assertStrictEquals(JSON.stringify(p), '"a"');
    } else if (i === 1) {
      assertStrictEquals(JSON.stringify(p), '"charset"');
    }

    i++;
  }
  assertStrictEquals(i, 2);
});
