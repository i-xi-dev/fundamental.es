import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toArray()", () => {
  const a1 = Uint8Array.of(3, 2, 1, 0);
  const bs1 = ByteSequence.fromBytes(a1);

  const c1 = bs1.toArray();
  assertStrictEquals(Array.isArray(c1), true);
  assertStrictEquals([...c1].join(","), "3,2,1,0");

  // 返却値への操作は自身に影響しない
  c1[0] = 255;
  assertStrictEquals([...a1].join(","), "3,2,1,0");
  assertStrictEquals([...c1].join(","), "255,2,1,0");
});
