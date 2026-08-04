import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.setByte()", () => {
  const b = ByteSequence.create(4);
  b.setByte(-1);
  b.setByte(0);
  b.setByte(0xFF);
  b.setByte(0x100);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes[0], 0xFF);
  assertStrictEquals(bytes[1], 0);
  assertStrictEquals(bytes[2], 0xFF);
  assertStrictEquals(bytes[3], 0);

  const b2 = ByteSequence.create(4);
  b2.setByte(-1, { clampMode: "truncate" });
  b2.setByte(0, { clampMode: "truncate" });
  b2.setByte(0xFF, { clampMode: "truncate" });
  b2.setByte(0x100, { clampMode: "truncate" });
  const bytes2 = new Uint8Array(b2.toArrayBufferWithDetach());
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0);
  assertStrictEquals(bytes2[2], 0xFF);
  assertStrictEquals(bytes2[3], 0);

  const b3 = ByteSequence.create(4);
  b3.setByte(-1, { clampMode: "saturate" });
  b3.setByte(0, { clampMode: "saturate" });
  b3.setByte(0xFF, { clampMode: "saturate" });
  b3.setByte(0x100, { clampMode: "saturate" });
  const bytes3 = new Uint8Array(b3.toArrayBufferWithDetach());
  assertStrictEquals(bytes3[0], 0);
  assertStrictEquals(bytes3[1], 0);
  assertStrictEquals(bytes3[2], 0xFF);
  assertStrictEquals(bytes3[3], 0xFF);
});

Deno.test("ByteSequence.prototype.setByte() - error", () => {
  const b = ByteSequence.create(4);
  const _ = b.toArrayBufferWithDetach();

  assertThrows(
    () => {
      b.setByte(0);
    },
    TypeError,
    "`ArrayBuffer` is detached",
  );
});

Deno.test("ByteSequence.prototype.setByte() - insertAt", () => {
  const b = ByteSequence.create(4);
  b.setByte(-1);
  b.setByte(0);
  b.setByte(0xFF);
  b.setByte(0x100);
  b.setByte(0x11, { insertAt: 0 });
  b.setByte(0x22, { insertAt: 1 });
  b.setByte(0x33, { insertAt: 2 });
  b.setByte(0x44, { insertAt: 3 });
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes[0], 0x11);
  assertStrictEquals(bytes[1], 0x22);
  assertStrictEquals(bytes[2], 0x33);
  assertStrictEquals(bytes[3], 0x44);

  const b2 = ByteSequence.create(4);
  b2.setByte(0xFF);
  assertThrows(
    () => {
      b2.setByte(0x11, { insertAt: -1 });
    },
    RangeError,
    "Insertion position is out of range",
  );

  const b3 = ByteSequence.create(4);
  b3.setByte(0xFF);
  assertThrows(
    () => {
      b3.setByte(0x11, { insertAt: 100 });
    },
    RangeError,
    "Insertion position is out of range",
  );
});
