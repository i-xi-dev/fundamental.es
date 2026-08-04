import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.create()", () => {
  const b = ByteSequence.create(10);
  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 0);
});

Deno.test("ByteSequence.create() - fixed-length", () => {
  const b = ByteSequence.create(4);
  b.setByte(0);
  b.setByte(1);
  b.setByte(2);
  b.setByte(3);

  assertThrows(
    () => {
      b.setByte(4);
    },
    RangeError,
    "`ArrayBuffer` cannot be resized",
  );

  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 1);
  assertStrictEquals(bytes[2], 2);
  assertStrictEquals(bytes[3], 3);
});

Deno.test("ByteSequence.create() - expandabe-length", () => {
  const b = ByteSequence.create(4, 8);
  b.setByte(0);
  b.setByte(1);
  b.setByte(2);
  b.setByte(3);
  b.setByte(4);

  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 5);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 1);
  assertStrictEquals(bytes[2], 2);
  assertStrictEquals(bytes[3], 3);
  assertStrictEquals(bytes[4], 4);
});

Deno.test("ByteSequence.create() - expandabe-length - 2", () => {
  const b = ByteSequence.create(4, 8);
  b.setByte(0);
  b.setByte(1);
  b.setByte(2);
  b.setByte(3);
  b.setByte(4);
  b.setByte(5);
  b.setByte(6);
  b.setByte(7);

  assertThrows(
    () => {
      b.setByte(8);
    },
    RangeError,
    "Exceeds the resize limit for `ArrayBuffer`",
  );

  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 8);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 1);
  assertStrictEquals(bytes[2], 2);
  assertStrictEquals(bytes[3], 3);
  assertStrictEquals(bytes[4], 4);
  assertStrictEquals(bytes[5], 5);
  assertStrictEquals(bytes[6], 6);
  assertStrictEquals(bytes[7], 7);
});

Deno.test("ByteSequence.create() - expandabe-length - 3", () => {
  const b = ByteSequence.create(4, 2);
  b.setByte(0);
  b.setByte(1);
  b.setByte(2);
  b.setByte(3);

  assertThrows(
    () => {
      b.setByte(4);
    },
    RangeError,
    "Exceeds the resize limit for `ArrayBuffer`",
  );

  const bytes = new Uint8Array(b.toArrayBufferWithDetach());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 1);
  assertStrictEquals(bytes[2], 2);
  assertStrictEquals(bytes[3], 3);
});

Deno.test("ByteSequence.create() - error", () => {
  assertThrows(
    () => {
      ByteSequence.create(-1);
    },
    TypeError,
    "Capacity must be a non-negative safe-integer of type `number`",
  );

  assertThrows(
    () => {
      ByteSequence.create(1, -1);
    },
    TypeError,
    "Max-capacity must be a non-negative safe-integer of type `number`",
  );

  assertThrows(
    () => {
      ByteSequence.create(Number.MAX_SAFE_INTEGER);
    },
    RangeError,
    "", // V8が出している
  );

  assertThrows(
    () => {
      ByteSequence.create(10, Number.MAX_SAFE_INTEGER);
    },
    RangeError,
    "", // V8が出している
  );
});
