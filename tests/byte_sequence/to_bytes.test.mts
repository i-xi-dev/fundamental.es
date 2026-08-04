import { assertNotStrictEquals, assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.toBytes()", () => {
  const a1 = Uint8Array.of(3, 2, 1, 0);
  const bs1 = ByteSequence.create(90);
  bs1.loadUint8Iterable(a1);

  const c1 = bs1.toBytes();
  assertStrictEquals(c1 instanceof Uint8Array, true);
  assertStrictEquals([...c1].join(","), "3,2,1,0");
  assertNotStrictEquals(a1, c1);

  // 返却値への操作は自身に影響しない
  c1[0] = 255;
  assertStrictEquals([...a1].join(","), "3,2,1,0");
  assertStrictEquals([...c1].join(","), "255,2,1,0");
});

Deno.test("ByteSequence.prototype.toBytes() - byteLength", () => {
  const a1 = Uint8Array.of(3, 2, 1, 0);
  const bs1 = ByteSequence.create(90);
  bs1.loadUint8Iterable(a1);

  const c1 = bs1.toBytes({ byteLength: 2 });
  assertStrictEquals(c1 instanceof Uint8Array, true);
  assertStrictEquals([...c1].join(","), "3,2");
});
