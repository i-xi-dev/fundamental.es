import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype[Symbol.toStringTag]", () => {
  const b = ByteSequence.create(0);
  assertStrictEquals(b[Symbol.toStringTag], "ByteSequence");
});
