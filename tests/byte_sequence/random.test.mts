import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";
import { _Type } from "../../src/_common/mod.mts";

Deno.test("ByteSequence.random()", () => {
  const b = ByteSequence.random(4);
  assertStrictEquals(b.resizable, false);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  console.log(bytes.toHex());
  assertStrictEquals(_Type.isUint8(bytes[0]), true);
  assertStrictEquals(_Type.isUint8(bytes[1]), true);
  assertStrictEquals(_Type.isUint8(bytes[2]), true);
  assertStrictEquals(_Type.isUint8(bytes[3]), true);

  const b2 = ByteSequence.random(4, { maxCapacity: 6 });
  assertStrictEquals(b2.resizable, true);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  console.log(bytes2.toHex());
  assertStrictEquals(_Type.isUint8(bytes2[0]), true);
  assertStrictEquals(_Type.isUint8(bytes2[1]), true);
  assertStrictEquals(_Type.isUint8(bytes2[2]), true);
  assertStrictEquals(_Type.isUint8(bytes2[3]), true);
});

Deno.test("ByteSequence.random() - error", () => {
  assertThrows(
    () => {
      ByteSequence.random("4" as unknown as number);
    },
    TypeError,
    "Input must be a non-negative safe-integer of type `number`",
  );
});
