import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.nil()", () => {
  const u0 = Uuid.nil();
  assertStrictEquals(u0.toString(), "00000000-0000-0000-0000-000000000000");
  assertStrictEquals(u0.variant, 0);
  assertStrictEquals(u0.version, 0);
  assertStrictEquals(u0.timestamp, null);
});
