import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.fromBinaryString()", () => {
  const b = ByteSequence.fromBinaryString(
    "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC",
  );
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 8);
  assertStrictEquals(bytes[0], 0x3);
  assertStrictEquals(bytes[1], 0x2);
  assertStrictEquals(bytes[2], 0x1);
  assertStrictEquals(bytes[3], 0);
  assertStrictEquals(bytes[4], 0xFF);
  assertStrictEquals(bytes[5], 0xFE);
  assertStrictEquals(bytes[6], 0xFD);
  assertStrictEquals(bytes[7], 0xFC);

  const b3 = ByteSequence.fromBinaryString(
    "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC",
    {
      maxCapacity: 100,
    },
  );
  assertStrictEquals(b3.resizable, true);
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3.byteLength, 8);
  assertStrictEquals(bytes3[0], 0x3);
  assertStrictEquals(bytes3[1], 0x2);
  assertStrictEquals(bytes3[2], 0x1);
  assertStrictEquals(bytes3[3], 0);
  assertStrictEquals(bytes3[4], 0xFF);
  assertStrictEquals(bytes3[5], 0xFE);
  assertStrictEquals(bytes3[6], 0xFD);
  assertStrictEquals(bytes3[7], 0xFC);
});

Deno.test("ByteSequence.fromBinaryString() - error", () => {
  assertThrows(
    () => {
      ByteSequence.fromBinaryString(null as unknown as string);
    },
    TypeError,
    "Input must be a `string`",
  );

  assertThrows(
    () => {
      ByteSequence.fromBinaryString("あ");
    },
    SyntaxError,
    "Input must not contain characters outside of the Latin1 range",
  );
});
