import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.parameters()", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(JSON.stringify([...i0.parameters()]), "[]");

  const i0b = Resource.MediaType.fromString("text/plain;charset=utf-8");
  assertStrictEquals(
    JSON.stringify([...i0b.parameters()]),
    '[["charset","utf-8"]]',
  );

  const i0c = Resource.MediaType.fromString("text/plain;charset=utf-8; a=,");
  assertStrictEquals(
    JSON.stringify([...i0c.parameters()]),
    '[["a",","],["charset","utf-8"]]',
  );

  let i = 0;
  for (const p of i0c.parameters()) {
    if (i === 0) {
      assertStrictEquals(JSON.stringify(p), '["a",","]');
    } else if (i === 1) {
      assertStrictEquals(JSON.stringify(p), '["charset","utf-8"]');
    }

    i++;
  }
  assertStrictEquals(i, 2);
});
