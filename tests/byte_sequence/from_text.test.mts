import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.fromText()", () => {
  const b = ByteSequence.fromText("10");
  assertStrictEquals(b.resizable, false);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 2);
  assertStrictEquals(bytes[0], 49);
  assertStrictEquals(bytes[1], 48);

  const b2 = ByteSequence.fromText("10", { prependBOM: true, maxCapacity: 10 });
  assertStrictEquals(b2.resizable, true);
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 5);
  assertStrictEquals(bytes2[0], 239);
  assertStrictEquals(bytes2[1], 187);
  assertStrictEquals(bytes2[2], 191);
  assertStrictEquals(bytes2[3], 49);
  assertStrictEquals(bytes2[4], 48);

  assertThrows(
    () => {
      ByteSequence.fromText("\uDFFF", { fatal: true });
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-8",
  );
});
