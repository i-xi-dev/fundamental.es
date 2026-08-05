import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.zerosFilled()", () => {
  const b = ByteSequence.zerosFilled(4);
  assertStrictEquals(b.resizable, false);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 0);
  assertStrictEquals(bytes[2], 0);
  assertStrictEquals(bytes[3], 0);

  const b2 = ByteSequence.zerosFilled(4, { maxCapacity: 6 });
  assertStrictEquals(b2.resizable, true);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 0);
  assertStrictEquals(bytes2[1], 0);
  assertStrictEquals(bytes2[2], 0);
  assertStrictEquals(bytes2[3], 0);
});

Deno.test("ByteSequence.zerosFilled() - error", () => {
  assertThrows(
    () => {
      ByteSequence.zerosFilled("4" as unknown as number);
    },
    TypeError,
    "Input must be a non-negative safe-integer of type `number`",
  );
});
