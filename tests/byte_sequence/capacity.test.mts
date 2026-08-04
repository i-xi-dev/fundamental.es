import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.capacity", () => {
  const b = ByteSequence.create(0);
  assertStrictEquals(b.capacity, 0);

  const b2 = ByteSequence.create(10);
  assertStrictEquals(b2.capacity, 10);
});
