import { assertRejects, assertStrictEquals } from "@std/assert";
import * as _Utf8 from "../../../src/text_encoding/_utf8/mod.mts";

Deno.test("_Utf8.DecoderStream", async () => {
  const e1 = new _Utf8.DecoderStream();
  assertStrictEquals(e1.encoding, "utf-8");

  const i1 = ReadableStream.from((function* () {
    yield Uint8Array.of(48, 49);
  })());
  const o1 = i1.pipeThrough(e1);
  let oStr1 = "";
  for await (const x of o1) {
    oStr1 += x;
  }
  assertStrictEquals(oStr1, "01");

  const e2 = new _Utf8.DecoderStream();
  const i2 = ReadableStream.from((function* () {
    yield Uint8Array.of(239, 187, 191, 48, 239, 187, 191, 49);
  })());
  const o2 = i2.pipeThrough(e2);
  let oStr2 = "";
  for await (const x of o2) {
    oStr2 += x;
  }
  assertStrictEquals(oStr2, "0\uFEFF1");

  const e2x = new _Utf8.DecoderStream({ ignoreBOM: true });
  const i2x = ReadableStream.from((function* () {
    yield Uint8Array.of(239, 187, 191, 48, 239, 187, 191, 49);
  })());
  const o2x = i2x.pipeThrough(e2x);
  let oStr2x = "";
  for await (const x of o2x) {
    oStr2x += x;
  }
  assertStrictEquals(oStr2x, "\uFEFF0\uFEFF1");

  const e3 = new _Utf8.DecoderStream({ fatal: true });
  const i3 = ReadableStream.from((function* () {
    yield Uint8Array.of(48, 49);
  })());
  const o3 = i3.pipeThrough(e3);
  let oStr3 = "";
  for await (const x of o3) {
    oStr3 += x;
  }
  assertStrictEquals(oStr3, "01");

  const e4 = new _Utf8.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(
      48,
      240,
      144,
      143,
      191,
      49,
      227,
      129,
      130,
      50,
      195,
      132,
      51,
    );
  })());
  const o4 = i4.pipeThrough(e4);
  let oStr4 = "";
  for await (const x of o4) {
    oStr4 += x;
  }
  assertStrictEquals(oStr4, "0\uD800\uDFFF1あ2Ä3");

  const e4b = new _Utf8.DecoderStream({ fatal: true });
  const i4b = ReadableStream.from((function* () {
    yield Uint8Array.of(48);
    yield Uint8Array.of(240);
    yield Uint8Array.of(144);
    yield Uint8Array.of(143);
    yield Uint8Array.of(191);
    yield Uint8Array.of(49);
    yield Uint8Array.of(227);
    yield Uint8Array.of(129);
    yield Uint8Array.of(130);
    yield Uint8Array.of(50);
    yield Uint8Array.of(195);
    yield Uint8Array.of(132);
    yield Uint8Array.of(51);
  })());
  const o4b = i4b.pipeThrough(e4b);
  let oStr4b = "";
  for await (const x of o4b) {
    oStr4b += x;
  }
  assertStrictEquals(oStr4b, "0\uD800\uDFFF1あ2Ä3");
});

Deno.test("_Utf8.DecoderStream - 冗長符号化", async () => {
  const e4 = new _Utf8.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(0xE0, 0x80, 0x80);
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

Deno.test("_Utf8.DecoderStream - 孤立サロゲート", async () => {
  const e4 = new _Utf8.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(0xED, 0xA0, 0x80);
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

Deno.test("_Utf8.DecoderStream - 範囲外", async () => {
  const e4 = new _Utf8.DecoderStream({ fatal: true });
  const i4 = ReadableStream.from((function* () {
    yield Uint8Array.of(0xF4, 0x90, 0x80, 0x80);
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
