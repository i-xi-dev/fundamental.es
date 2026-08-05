import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.fromPercentEncoded()", () => {
  const b = ByteSequence.fromPercentEncoded(
    "%03%02%01%00%FF%FE%FD%FC",
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

  const b2 = ByteSequence.fromPercentEncoded(
    "%03%02%01+%00",
    { spaceAsPlus: true },
  );
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2.byteLength, 5);
  assertStrictEquals(bytes2[0], 0x3);
  assertStrictEquals(bytes2[1], 0x2);
  assertStrictEquals(bytes2[2], 0x1);
  assertStrictEquals(bytes2[3], 0x20);
  assertStrictEquals(bytes2[4], 0);

  const b3 = ByteSequence.fromPercentEncoded(
    "%03%02%01%00%FF%FE%FD%FC",
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

Deno.test("ByteSequence.fromPercentEncoded() - error", () => {
  assertThrows(
    () => {
      ByteSequence.fromPercentEncoded(null as unknown as string);
    },
    TypeError,
    "Input must be a `string`",
  );

  assertThrows(
    () => {
      ByteSequence.fromPercentEncoded("あ");
    },
    SyntaxError,
    "Input must not contain controls or characters outside of the US-ASCII range",
  );
});
