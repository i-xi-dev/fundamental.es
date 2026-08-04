import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.resizable", () => {
  const b = ByteSequence.create(0);
  assertStrictEquals(b.resizable, false);

  const b2 = ByteSequence.create(10);
  assertStrictEquals(b2.resizable, false);

  const b3 = ByteSequence.create(0, 2);
  assertStrictEquals(b3.resizable, true);

  const b4 = ByteSequence.create(10, 10);
  assertStrictEquals(b4.resizable, true);
});
