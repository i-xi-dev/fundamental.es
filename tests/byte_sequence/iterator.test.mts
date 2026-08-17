import { assertStrictEquals, fail } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype[Symbol.iterator]()", () => {
  const b = ByteSequence.create(0);
  for (const i of b) {
    fail(`${i}`);
  }

  const b2 = ByteSequence.create(10, 20);
  for (const i of b2) {
    fail(`${i}`);
  }
  b2.fillRandom(10);
  let c = 0;
  for (const i of b2) {
    c++;
  }
  assertStrictEquals(c, 10);
});
