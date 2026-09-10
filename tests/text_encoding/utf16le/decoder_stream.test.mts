import { assertRejects, assertStrictEquals } from "@std/assert";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf16Le.DecoderStream", async () => {
  const e1 = new TextEncoding.Utf16Le.DecoderStream();
  assertStrictEquals(e1.encoding, "utf-16le");

  const i1 = ReadableStream.from((function* () {
    yield Uint8Array.of(48, 0, 49, 0);
  })());
  const o1 = i1.pipeThrough(e1);
  let oStr1 = "";
  for await (const x of o1) {
    oStr1 += x;
  }
  assertStrictEquals(oStr1, "01");

  const e2 = new TextEncoding.Utf16Le.DecoderStream();
  const i2 = ReadableStream.from((function* () {
    yield Uint8Array.of(0xFF, 0xFE, 48, 0, 0xFF, 0xFE, 49, 0);
  })());
  const o2 = i2.pipeThrough(e2);
  let oStr2 = "";
  for await (const x of o2) {
    oStr2 += x;
  }
  assertStrictEquals(oStr2, "0\uFEFF1");

  const e2x = new TextEncoding.Utf16Le.DecoderStream({ ignoreBom: true });
  const i2x = ReadableStream.from((function* () {
    yield Uint8Array.of(0xFF, 0xFE, 48, 0, 0xFF, 0xFE, 49, 0);
  })());
  const o2x = i2x.pipeThrough(e2x);
  let oStr2x = "";
  for await (const x of o2x) {
    oStr2x += x;
  }
  assertStrictEquals(oStr2x, "\uFEFF0\uFEFF1");

  const e3 = new TextEncoding.Utf16Le.DecoderStream({ fatal: true });
  const i3 = ReadableStream.from((function* () {
    yield Uint8Array.of(48, 0, 49, 0);
  })());
  const o3 = i3.pipeThrough(e3);
  let oStr3 = "";
  for await (const x of o3) {
    oStr3 += x;
  }
  assertStrictEquals(oStr3, "01");

  const e4 = new TextEncoding.Utf16Le.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(
      48,
      0,
      0,
      0xD8,
      0xFF,
      0xDF,
      49,
      0,
      0x42,
      0x30,
      50,
      0,
      0xC4,
      0,
      51,
      0,
    );
  })());
  const o4 = i4.pipeThrough(e4);
  let oStr4 = "";
  for await (const x of o4) {
    oStr4 += x;
  }
  assertStrictEquals(oStr4, "0\uD800\uDFFF1あ2Ä3");

  const e4b = new TextEncoding.Utf16Le.DecoderStream({ fatal: true });
  const i4b = ReadableStream.from((function* () {
    yield Uint8Array.of(48);
    yield Uint8Array.of(0);
    yield Uint8Array.of(0);
    yield Uint8Array.of(0xD8);
    yield Uint8Array.of(0xFF);
    yield Uint8Array.of(0xDF);
    yield Uint8Array.of(49);
    yield Uint8Array.of(0);
    yield Uint8Array.of(0x42);
    yield Uint8Array.of(0x30);
    yield Uint8Array.of(50);
    yield Uint8Array.of(0);
    yield Uint8Array.of(0xC4);
    yield Uint8Array.of(0);
    yield Uint8Array.of(51);
    yield Uint8Array.of(0);
  })());
  const o4b = i4b.pipeThrough(e4b);
  let oStr4b = "";
  for await (const x of o4b) {
    oStr4b += x;
  }
  assertStrictEquals(oStr4b, "0\uD800\uDFFF1あ2Ä3");
});

Deno.test("TextEncoding.Utf16Le.DecoderStream - 孤立サロゲート", async () => {
  const e4 = new TextEncoding.Utf16Le.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(0, 0xD8);
  })());
  const o4 = i4.pipeThrough(e4);
  let oStr4 = "";

  await assertRejects(
    async () => {
      for await (const x of o4) {
        oStr4 += x;
      }
    },
    TypeError,
    "The encoded data is not valid",
  );
});

Deno.test("TextEncoding.Utf16Le.DecoderStream - 範囲外", async () => {
  const e4 = new TextEncoding.Utf16Le.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(0xFF, 0xDF, 0, 0xD8);
  })());
  const o4 = i4.pipeThrough(e4);
  let oStr4 = "";

  await assertRejects(
    async () => {
      for await (const x of o4) {
        oStr4 += x;
      }
    },
    TypeError,
    "The encoded data is not valid",
  );
});

Deno.test("TextEncoding.Utf16Le.DecoderStream - 奇数バイト", async () => {
  const e4 = new TextEncoding.Utf16Le.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(48, 0, 49);
  })());
  const o4 = i4.pipeThrough(e4);
  let oStr4 = "";

  await assertRejects(
    async () => {
      for await (const x of o4) {
        oStr4 += x;
      }
    },
    TypeError,
    "The encoded data is not valid",
  );
});
