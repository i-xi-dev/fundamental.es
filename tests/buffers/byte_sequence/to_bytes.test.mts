import { assertNotStrictEquals, assertStrictEquals } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.ByteSequence.prototype.toBytes()", () => {
  const a1 = Uint8Array.of(3, 2, 1, 0);
  const bs1 = Buffers.ByteSequence.fromBytes(a1);

  const c1 = bs1.toBytes();
  assertStrictEquals(c1 instanceof Uint8Array, true);
  assertStrictEquals([...c1].join(","), "3,2,1,0");
  assertNotStrictEquals(a1, c1);

  // 返却値への操作は自身に影響しない
  c1[0] = 255;
  assertStrictEquals([...a1].join(","), "3,2,1,0");
  assertStrictEquals([...c1].join(","), "255,2,1,0");
});
