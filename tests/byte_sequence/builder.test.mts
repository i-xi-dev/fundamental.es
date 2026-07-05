import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.Builder.prototype[Symbol.toStringTag]", () => {
  const b = ByteSequence.Builder.create(0);
  assertStrictEquals(b[Symbol.toStringTag], "ByteSequenceBuilder");
});

Deno.test("ByteSequence.Builder.prototype.detached", () => {
  const b = ByteSequence.Builder.create(0);
  assertStrictEquals(b.detached, false);

  const _ = b.toArrayBuffer();
  assertStrictEquals(b.detached, true);
});

Deno.test("ByteSequence.Builder.prototype.capacity", () => {
  const b = ByteSequence.Builder.create(0);
  assertStrictEquals(b.capacity, 0);

  const b2 = ByteSequence.Builder.create(10);
  assertStrictEquals(b2.capacity, 10);
});

Deno.test("ByteSequence.Builder.create()", () => {
  const b = ByteSequence.Builder.create(10);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 0);
});

Deno.test("ByteSequence.Builder.create() - fixed-length", () => {
  const b = ByteSequence.Builder.create(4);
  b.appendUint8(0);
  b.appendUint8(1);
  b.appendUint8(2);
  b.appendUint8(3);

  assertThrows(
    () => {
      b.appendUint8(4);
    },
    RangeError,
    "`ArrayBuffer` cannot be resized",
  );

  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 1);
  assertStrictEquals(bytes[2], 2);
  assertStrictEquals(bytes[3], 3);
});

Deno.test("ByteSequence.Builder.create() - expandabe-length", () => {
  const b = ByteSequence.Builder.create(4, 8);
  b.appendUint8(0);
  b.appendUint8(1);
  b.appendUint8(2);
  b.appendUint8(3);
  b.appendUint8(4);

  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 5);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 1);
  assertStrictEquals(bytes[2], 2);
  assertStrictEquals(bytes[3], 3);
  assertStrictEquals(bytes[4], 4);
});

Deno.test("ByteSequence.Builder.create() - expandabe-length - 2", () => {
  const b = ByteSequence.Builder.create(4, 8);
  b.appendUint8(0);
  b.appendUint8(1);
  b.appendUint8(2);
  b.appendUint8(3);
  b.appendUint8(4);
  b.appendUint8(5);
  b.appendUint8(6);
  b.appendUint8(7);

  assertThrows(
    () => {
      b.appendUint8(8);
    },
    RangeError,
    "Exceeds the resize limit for `ArrayBuffer`",
  );

  const bytes = new Uint8Array(b.toArrayBuffer());
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

Deno.test("ByteSequence.Builder.create() - expandabe-length - 3", () => {
  const b = ByteSequence.Builder.create(4, 2);
  b.appendUint8(0);
  b.appendUint8(1);
  b.appendUint8(2);
  b.appendUint8(3);

  assertThrows(
    () => {
      b.appendUint8(4);
    },
    RangeError,
    "Exceeds the resize limit for `ArrayBuffer`",
  );

  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0);
  assertStrictEquals(bytes[1], 1);
  assertStrictEquals(bytes[2], 2);
  assertStrictEquals(bytes[3], 3);
});

Deno.test("ByteSequence.Builder.create() - error", () => {
  assertThrows(
    () => {
      ByteSequence.Builder.create(-1);
    },
    TypeError,
    "Capacity must be a non-negative safe-integer of type `number`",
  );

  assertThrows(
    () => {
      ByteSequence.Builder.create(1, -1);
    },
    TypeError,
    "Max-capacity must be a non-negative safe-integer of type `number`",
  );

  assertThrows(
    () => {
      ByteSequence.Builder.create(Number.MAX_SAFE_INTEGER);
    },
    RangeError,
    "", // V8が出している
  );

  assertThrows(
    () => {
      ByteSequence.Builder.create(10, Number.MAX_SAFE_INTEGER);
    },
    RangeError,
    "", // V8が出している
  );
});

Deno.test("ByteSequence.Builder.prototype.appendUint8()", () => {
  const b = ByteSequence.Builder.create(4);
  b.appendUint8(-1);
  b.appendUint8(0);
  b.appendUint8(0xFF);
  b.appendUint8(0x100);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes[0], 0xFF);
  assertStrictEquals(bytes[1], 0);
  assertStrictEquals(bytes[2], 0xFF);
  assertStrictEquals(bytes[3], 0);

  const b2 = ByteSequence.Builder.create(4);
  b2.appendUint8(-1, { clampMode: "truncate" });
  b2.appendUint8(0, { clampMode: "truncate" });
  b2.appendUint8(0xFF, { clampMode: "truncate" });
  b2.appendUint8(0x100, { clampMode: "truncate" });
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0);
  assertStrictEquals(bytes2[2], 0xFF);
  assertStrictEquals(bytes2[3], 0);

  const b3 = ByteSequence.Builder.create(4);
  b3.appendUint8(-1, { clampMode: "saturate" });
  b3.appendUint8(0, { clampMode: "saturate" });
  b3.appendUint8(0xFF, { clampMode: "saturate" });
  b3.appendUint8(0x100, { clampMode: "saturate" });
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3[0], 0);
  assertStrictEquals(bytes3[1], 0);
  assertStrictEquals(bytes3[2], 0xFF);
  assertStrictEquals(bytes3[3], 0xFF);
});

Deno.test("ByteSequence.Builder.prototype.appendUint8() - error", () => {
  const b = ByteSequence.Builder.create(4);
  const _ = b.toArrayBuffer();

  assertThrows(
    () => {
      b.appendUint8(0);
    },
    TypeError,
    "`ArrayBuffer` is detached",
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromArrayBuffer()", () => {
  const testdata = Uint8Array.of(255, 254, 253);

  const b = ByteSequence.Builder.create(4);
  b.loadFromArrayBuffer(testdata.buffer);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);

  const testdata2 = Uint8Array.of(255, 254, 253, 252);

  const b2 = ByteSequence.Builder.create(4);
  b2.loadFromArrayBuffer(testdata2.buffer);
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 255);
  assertStrictEquals(bytes2[1], 254);
  assertStrictEquals(bytes2[2], 253);
  assertStrictEquals(bytes2[3], 252);

  const testdata3 = Uint8Array.of(255, 254, 253, 252, 251);

  const b3 = ByteSequence.Builder.create(0, 10);
  b3.loadFromArrayBuffer(testdata3.buffer);
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3.byteLength, 5);
  assertStrictEquals(bytes3[0], 255);
  assertStrictEquals(bytes3[1], 254);
  assertStrictEquals(bytes3[2], 253);
  assertStrictEquals(bytes3[3], 252);
  assertStrictEquals(bytes3[4], 251);
});

Deno.test("ByteSequence.Builder.prototype.loadFromArrayBuffer() - error", () => {
  const b = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      const testdata = Uint8Array.of(255, 254, 253, 252, 251);
      b.loadFromArrayBuffer(testdata.buffer);
    },
    RangeError,
    "`ArrayBuffer` cannot be resized",
  );

  const b2 = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b.loadFromArrayBuffer([255] as unknown as ArrayBuffer);
    },
    TypeError,
    "Input must be an `ArrayBuffer`",
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromUint8s()", () => {
  const b = ByteSequence.Builder.create(4);
  b.loadFromUint8s([255, 254, 253]);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);

  const b2 = ByteSequence.Builder.create(4);
  b2.loadFromUint8s(Uint8Array.of(255, 254, 253));
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 3);
  assertStrictEquals(bytes2[0], 255);
  assertStrictEquals(bytes2[1], 254);
  assertStrictEquals(bytes2[2], 253);
});

Deno.test("ByteSequence.Builder.prototype.loadFromUint8s() - error", () => {
  const b = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b.loadFromUint8s(["255", "254", "253"] as unknown as number[]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );

  const b2 = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b2.loadFromUint8s("255" as unknown as number[]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );

  const b3 = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b3.loadFromUint8s(255 as unknown as number[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncUint8s()", async () => {
  async function* bs() {
    yield 255;
    yield 254;
    yield 253;
  }

  const b = ByteSequence.Builder.create(4);
  await b.loadFromAsyncUint8s(bs());
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 255);
  assertStrictEquals(bytes[1], 254);
  assertStrictEquals(bytes[2], 253);
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncUint8s() - error", async () => {
  const b3 = ByteSequence.Builder.create(4);
  await assertRejects(
    async () => {
      await b3.loadFromAsyncUint8s(255 as unknown as AsyncIterable<number>);
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromUint16s()", () => {
  const b = ByteSequence.Builder.create(4);
  b.loadFromUint16s([0xFFF0, 0x0033]);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0xF0);
  assertStrictEquals(bytes[1], 0xFF);
  assertStrictEquals(bytes[2], 0x33);
  assertStrictEquals(bytes[3], 0x00);

  const b2 = ByteSequence.Builder.create(4);
  b2.loadFromUint16s([0xFFF0, 0x0033], { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x00);
  assertStrictEquals(bytes2[3], 0x33);

  const b3 = ByteSequence.Builder.create(4);
  b3.loadFromUint16s([0xFFF0, 0x0033], { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3.byteLength, 4);
  assertStrictEquals(bytes3[0], 0xF0);
  assertStrictEquals(bytes3[1], 0xFF);
  assertStrictEquals(bytes3[2], 0x33);
  assertStrictEquals(bytes3[3], 0x00);
});

Deno.test("ByteSequence.Builder.prototype.loadFromUint16s() - error", () => {
  const b3 = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b3.loadFromUint16s(255 as unknown as number[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );

  const b4 = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b4.loadFromUint16s([255, "x" as unknown as number]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncUint16s()", async () => {
  async function* bs() {
    yield 0xFFF0;
    yield 0x0033;
  }

  const b = ByteSequence.Builder.create(4);
  await b.loadFromAsyncUint16s(bs());
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 4);
  assertStrictEquals(bytes[0], 0xF0);
  assertStrictEquals(bytes[1], 0xFF);
  assertStrictEquals(bytes[2], 0x33);
  assertStrictEquals(bytes[3], 0x00);

  const b2 = ByteSequence.Builder.create(4);
  await b2.loadFromAsyncUint16s(bs(), { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 4);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x00);
  assertStrictEquals(bytes2[3], 0x33);

  const b3 = ByteSequence.Builder.create(4);
  await b3.loadFromAsyncUint16s(bs(), { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3.byteLength, 4);
  assertStrictEquals(bytes3[0], 0xF0);
  assertStrictEquals(bytes3[1], 0xFF);
  assertStrictEquals(bytes3[2], 0x33);
  assertStrictEquals(bytes3[3], 0x00);
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncUint16s() - error", async () => {
  const b3 = ByteSequence.Builder.create(4);
  await assertRejects(
    async () => {
      await b3.loadFromAsyncUint16s(255 as unknown as AsyncIterable<number>);
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromUint32s()", () => {
  const b = ByteSequence.Builder.create(8);
  b.loadFromUint32s([0xFFF01234, 1]);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 8);
  assertStrictEquals(bytes[0], 0x34);
  assertStrictEquals(bytes[1], 0x12);
  assertStrictEquals(bytes[2], 0xF0);
  assertStrictEquals(bytes[3], 0xFF);
  assertStrictEquals(bytes[4], 1);
  assertStrictEquals(bytes[5], 0);
  assertStrictEquals(bytes[6], 0);
  assertStrictEquals(bytes[7], 0);

  const b2 = ByteSequence.Builder.create(8);
  b2.loadFromUint32s([0xFFF01234, 1], { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 8);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x12);
  assertStrictEquals(bytes2[3], 0x34);
  assertStrictEquals(bytes2[4], 0);
  assertStrictEquals(bytes2[5], 0);
  assertStrictEquals(bytes2[6], 0);
  assertStrictEquals(bytes2[7], 1);

  const b3 = ByteSequence.Builder.create(8);
  b3.loadFromUint32s([0xFFF01234, 1], { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3.byteLength, 8);
  assertStrictEquals(bytes3[0], 0x34);
  assertStrictEquals(bytes3[1], 0x12);
  assertStrictEquals(bytes3[2], 0xF0);
  assertStrictEquals(bytes3[3], 0xFF);
  assertStrictEquals(bytes3[4], 1);
  assertStrictEquals(bytes3[5], 0);
  assertStrictEquals(bytes3[6], 0);
  assertStrictEquals(bytes3[7], 0);
});

Deno.test("ByteSequence.Builder.prototype.loadFromUint32s() - error", () => {
  const b3 = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b3.loadFromUint32s(255 as unknown as number[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );

  const b4 = ByteSequence.Builder.create(4);
  assertThrows(
    () => {
      b4.loadFromUint32s([255, "x" as unknown as number]);
    },
    TypeError,
    "Input must be a safe-integer of type `number`", //XXX 主語を変えたい
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncUint32s()", async () => {
  async function* bs() {
    yield 0xFFF01234;
    yield 1;
  }

  const b = ByteSequence.Builder.create(8);
  await b.loadFromAsyncUint32s(bs());
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 8);
  assertStrictEquals(bytes[0], 0x34);
  assertStrictEquals(bytes[1], 0x12);
  assertStrictEquals(bytes[2], 0xF0);
  assertStrictEquals(bytes[3], 0xFF);
  assertStrictEquals(bytes[4], 1);
  assertStrictEquals(bytes[5], 0);
  assertStrictEquals(bytes[6], 0);
  assertStrictEquals(bytes[7], 0);

  const b2 = ByteSequence.Builder.create(8);
  await b2.loadFromAsyncUint32s(bs(), { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 8);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x12);
  assertStrictEquals(bytes2[3], 0x34);
  assertStrictEquals(bytes2[4], 0);
  assertStrictEquals(bytes2[5], 0);
  assertStrictEquals(bytes2[6], 0);
  assertStrictEquals(bytes2[7], 1);

  const b3 = ByteSequence.Builder.create(8);
  await b3.loadFromAsyncUint32s(bs(), { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3.byteLength, 8);
  assertStrictEquals(bytes3[0], 0x34);
  assertStrictEquals(bytes3[1], 0x12);
  assertStrictEquals(bytes3[2], 0xF0);
  assertStrictEquals(bytes3[3], 0xFF);
  assertStrictEquals(bytes3[4], 1);
  assertStrictEquals(bytes3[5], 0);
  assertStrictEquals(bytes3[6], 0);
  assertStrictEquals(bytes3[7], 0);
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncUint32s() - error", async () => {
  const b3 = ByteSequence.Builder.create(4);
  await assertRejects(
    async () => {
      await b3.loadFromAsyncUint32s(255 as unknown as AsyncIterable<number>);
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromBigUint64s()", () => {
  const b = ByteSequence.Builder.create(16);
  b.loadFromBigUint64s([0xFFF0123466554433n, 1n]);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 16);
  assertStrictEquals(bytes[0], 0x33);
  assertStrictEquals(bytes[1], 0x44);
  assertStrictEquals(bytes[2], 0x55);
  assertStrictEquals(bytes[3], 0x66);
  assertStrictEquals(bytes[4], 0x34);
  assertStrictEquals(bytes[5], 0x12);
  assertStrictEquals(bytes[6], 0xF0);
  assertStrictEquals(bytes[7], 0xFF);
  assertStrictEquals(bytes[8], 1);
  assertStrictEquals(bytes[9], 0);
  assertStrictEquals(bytes[10], 0);
  assertStrictEquals(bytes[11], 0);
  assertStrictEquals(bytes[12], 0);
  assertStrictEquals(bytes[13], 0);
  assertStrictEquals(bytes[14], 0);
  assertStrictEquals(bytes[15], 0);

  const b2 = ByteSequence.Builder.create(16);
  b2.loadFromBigUint64s([0xFFF0123466554433n, 1n], { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 16);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x12);
  assertStrictEquals(bytes2[3], 0x34);
  assertStrictEquals(bytes2[4], 0x66);
  assertStrictEquals(bytes2[5], 0x55);
  assertStrictEquals(bytes2[6], 0x44);
  assertStrictEquals(bytes2[7], 0x33);
  assertStrictEquals(bytes2[8], 0);
  assertStrictEquals(bytes2[9], 0);
  assertStrictEquals(bytes2[10], 0);
  assertStrictEquals(bytes2[11], 0);
  assertStrictEquals(bytes2[12], 0);
  assertStrictEquals(bytes2[13], 0);
  assertStrictEquals(bytes2[14], 0);
  assertStrictEquals(bytes2[15], 1);

  const b3 = ByteSequence.Builder.create(16);
  b3.loadFromBigUint64s([0xFFF0123466554433n, 1n], {
    byteOrder: "little-endian",
  });
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3.byteLength, 16);
  assertStrictEquals(bytes3[0], 0x33);
  assertStrictEquals(bytes3[1], 0x44);
  assertStrictEquals(bytes3[2], 0x55);
  assertStrictEquals(bytes3[3], 0x66);
  assertStrictEquals(bytes3[4], 0x34);
  assertStrictEquals(bytes3[5], 0x12);
  assertStrictEquals(bytes3[6], 0xF0);
  assertStrictEquals(bytes3[7], 0xFF);
  assertStrictEquals(bytes3[8], 1);
  assertStrictEquals(bytes3[9], 0);
  assertStrictEquals(bytes3[10], 0);
  assertStrictEquals(bytes3[11], 0);
  assertStrictEquals(bytes3[12], 0);
  assertStrictEquals(bytes3[13], 0);
  assertStrictEquals(bytes3[14], 0);
  assertStrictEquals(bytes3[15], 0);
});

Deno.test("ByteSequence.Builder.prototype.loadFromBigUint64s() - error", () => {
  const b3 = ByteSequence.Builder.create(16);
  assertThrows(
    () => {
      b3.loadFromBigUint64s(255 as unknown as bigint[]);
    },
    TypeError,
    "Input must be an `Iterable`",
  );

  const b4 = ByteSequence.Builder.create(16);
  assertThrows(
    () => {
      b4.loadFromBigUint64s([255n, "x" as unknown as bigint]);
    },
    TypeError,
    "Input must be a `bigint`", //XXX 主語を変えたい
  );
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncUint32s()", async () => {
  async function* bs() {
    yield 0xFFF0123466554433n;
    yield 1n;
  }

  const b = ByteSequence.Builder.create(16);
  await b.loadFromAsyncBigUint64s(bs());
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 16);
  assertStrictEquals(bytes[0], 0x33);
  assertStrictEquals(bytes[1], 0x44);
  assertStrictEquals(bytes[2], 0x55);
  assertStrictEquals(bytes[3], 0x66);
  assertStrictEquals(bytes[4], 0x34);
  assertStrictEquals(bytes[5], 0x12);
  assertStrictEquals(bytes[6], 0xF0);
  assertStrictEquals(bytes[7], 0xFF);
  assertStrictEquals(bytes[8], 1);
  assertStrictEquals(bytes[9], 0);
  assertStrictEquals(bytes[10], 0);
  assertStrictEquals(bytes[11], 0);
  assertStrictEquals(bytes[12], 0);
  assertStrictEquals(bytes[13], 0);
  assertStrictEquals(bytes[14], 0);
  assertStrictEquals(bytes[15], 0);

  const b2 = ByteSequence.Builder.create(16);
  await b2.loadFromAsyncBigUint64s(bs(), { byteOrder: "big-endian" });
  const bytes2 = new Uint8Array(b2.toArrayBuffer());
  assertStrictEquals(bytes2.byteLength, 16);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xF0);
  assertStrictEquals(bytes2[2], 0x12);
  assertStrictEquals(bytes2[3], 0x34);
  assertStrictEquals(bytes2[4], 0x66);
  assertStrictEquals(bytes2[5], 0x55);
  assertStrictEquals(bytes2[6], 0x44);
  assertStrictEquals(bytes2[7], 0x33);
  assertStrictEquals(bytes2[8], 0);
  assertStrictEquals(bytes2[9], 0);
  assertStrictEquals(bytes2[10], 0);
  assertStrictEquals(bytes2[11], 0);
  assertStrictEquals(bytes2[12], 0);
  assertStrictEquals(bytes2[13], 0);
  assertStrictEquals(bytes2[14], 0);
  assertStrictEquals(bytes2[15], 1);

  const b3 = ByteSequence.Builder.create(16);
  await b3.loadFromAsyncBigUint64s(bs(), { byteOrder: "little-endian" });
  const bytes3 = new Uint8Array(b3.toArrayBuffer());
  assertStrictEquals(bytes3.byteLength, 16);
  assertStrictEquals(bytes3[0], 0x33);
  assertStrictEquals(bytes3[1], 0x44);
  assertStrictEquals(bytes3[2], 0x55);
  assertStrictEquals(bytes3[3], 0x66);
  assertStrictEquals(bytes3[4], 0x34);
  assertStrictEquals(bytes3[5], 0x12);
  assertStrictEquals(bytes3[6], 0xF0);
  assertStrictEquals(bytes3[7], 0xFF);
  assertStrictEquals(bytes3[8], 1);
  assertStrictEquals(bytes3[9], 0);
  assertStrictEquals(bytes3[10], 0);
  assertStrictEquals(bytes3[11], 0);
  assertStrictEquals(bytes3[12], 0);
  assertStrictEquals(bytes3[13], 0);
  assertStrictEquals(bytes3[14], 0);
  assertStrictEquals(bytes3[15], 0);
});

Deno.test("ByteSequence.Builder.prototype.loadFromAsyncBigUint64s() - error", async () => {
  const b3 = ByteSequence.Builder.create(16);
  await assertRejects(
    async () => {
      await b3.loadFromAsyncBigUint64s(255 as unknown as AsyncIterable<bigint>);
    },
    TypeError,
    "Input must be an `AsyncIterable`",
  );
});

Deno.test("ByteSequence.Builder.prototype.toArrayBuffer()", () => {
  const b = ByteSequence.Builder.create(4, 8);
  b.appendUint8(0xFF);
  b.appendUint8(0xFE);
  b.appendUint8(0xFD);
  const bytes = new Uint8Array(b.toArrayBuffer());
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 0xFF);
  assertStrictEquals(bytes[1], 0xFE);
  assertStrictEquals(bytes[2], 0xFD);

  const b2 = ByteSequence.Builder.create(4, 8);
  b2.appendUint8(0xFF);
  b2.appendUint8(0xFE);
  b2.appendUint8(0xFD);
  const bytes2 = new Uint8Array(b2.toArrayBuffer({ byteLength: 2 }));
  assertStrictEquals(bytes2.byteLength, 2);
  assertStrictEquals(bytes2.buffer.resizable, false);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xFE);
});

Deno.test("ByteSequence.Builder.prototype.toBytes()", () => {
  const b = ByteSequence.Builder.create(4, 8);
  b.appendUint8(0xFF);
  b.appendUint8(0xFE);
  b.appendUint8(0xFD);
  const bytes = b.toBytes();
  assertStrictEquals(bytes.byteLength, 3);
  assertStrictEquals(bytes[0], 0xFF);
  assertStrictEquals(bytes[1], 0xFE);
  assertStrictEquals(bytes[2], 0xFD);

  const b2 = ByteSequence.Builder.create(4, 8);
  b2.appendUint8(0xFF);
  b2.appendUint8(0xFE);
  b2.appendUint8(0xFD);
  const bytes2 = b2.toBytes({ byteLength: 2 });
  assertStrictEquals(bytes2.byteLength, 2);
  assertStrictEquals(bytes2.buffer.resizable, false);
  assertStrictEquals(bytes2[0], 0xFF);
  assertStrictEquals(bytes2[1], 0xFE);
});
