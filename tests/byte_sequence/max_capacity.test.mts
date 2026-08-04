import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.maxCapacity", () => {
  const b = ByteSequence.create(0);
  assertStrictEquals(b.maxCapacity, 0);

  const b2 = ByteSequence.create(10);
  assertStrictEquals(b2.maxCapacity, 10);

  const b3 = ByteSequence.create(0, 2);
  assertStrictEquals(b3.maxCapacity, 2);

  const b4 = ByteSequence.create(10, 10);
  assertStrictEquals(b4.maxCapacity, 10);
});
