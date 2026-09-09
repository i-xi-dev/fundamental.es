import { assertRejects, assertStrictEquals } from "@std/assert";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf16Le.EncoderStream", async () => {
  const e1 = new TextEncoding.Utf16Le.EncoderStream();
  assertStrictEquals(e1.encoding, "utf-16le");

  const i1 = ReadableStream.from((function* () {
    yield "01";
  })());
  const o1 = i1.pipeThrough(e1);
  let oStr1 = "";
  for await (const x of o1) {
    oStr1 += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr1, ",48,0,49,0");

  const e2 = new TextEncoding.Utf16Le.EncoderStream();
  const i2 = ReadableStream.from((function* () {
    yield "\uFEFF01";
  })());
  const o2 = i2.pipeThrough(e2);
  let oStr2 = "";
  for await (const x of o2) {
    oStr2 += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr2, ",255,254,48,0,49,0");

  const e2b = new TextEncoding.Utf16Le.EncoderStream();
  const i2b = ReadableStream.from((function* () {
    yield "\uFEFF";
    yield "0";
    yield "1";
  })());
  const o2b = i2b.pipeThrough(e2b);
  let oStr2b = "";
  for await (const x of o2b) {
    oStr2b += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr2b, ",255,254,48,0,49,0");

  const e3 = new TextEncoding.Utf16Le.EncoderStream();
  const i3 = ReadableStream.from((function* () {
    yield "0";
    yield "1";
    yield "\u{2000B}";
  })());
  const o3 = i3.pipeThrough(e3);
  let oStr3 = "";
  for await (const x of o3) {
    oStr3 += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr3, ",48,0,49,0,64,216,11,220");

  const e3b = new TextEncoding.Utf16Le.EncoderStream();
  const i3b = ReadableStream.from((function* () {
    yield "0";
    yield "1";
    yield "\u{D840}";
    yield "\u{DC0B}";
  })());
  const o3b = i3b.pipeThrough(e3b);
  let oStr3b = "";
  for await (const x of o3b) {
    oStr3b += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr3b, ",48,0,49,0,64,216,11,220");
});

Deno.test("TextEncoding.Utf16Le.EncoderStream - 孤立サロゲート", async () => {
  const e3b = new TextEncoding.Utf16Le.EncoderStream();
  const i3b = ReadableStream.from((function* () {
    yield "0";
    yield "1";
    yield "\u{D840}";
  })());
  const o3b = i3b.pipeThrough(e3b);
  let oStr3b = "";
  for await (const x of o3b) {
    oStr3b += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr3b, ",48,0,49,0,253,255");

  const e3c = new TextEncoding.Utf16Le.EncoderStream({ fatal: true });
  const i3c = ReadableStream.from((function* () {
    yield "0";
    yield "1";
    yield "\u{D840}";
  })());

  const o3c = i3c.pipeThrough(e3c);
  let oStr3c = "";

  await assertRejects(
    async () => {
      for await (const x of o3c) {
        oStr3c += `,${Array.from(x).join(",")}`;
      }
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-16LE",
  );
});
