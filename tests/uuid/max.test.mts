import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.max()", () => {
  const u0 = Uuid.max();
  assertStrictEquals(u0.toString(), "ffffffff-ffff-ffff-ffff-ffffffffffff");
  assertStrictEquals(u0.variant, 15);
  assertStrictEquals(u0.version, 15);
  assertStrictEquals(u0.timestamp, null);
});
