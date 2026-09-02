import { assertRejects, assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import * as _Utf8 from "../../../src/text_encoding/_utf8/mod.mts";

Deno.test("_Utf8.EncoderStream", async () => {
  const e1 = new _Utf8.EncoderStream();
  assertStrictEquals(e1.encoding, "utf-8");

  const i1 = ReadableStream.from((function* () {
    yield "01";
  })());
  const o1 = i1.pipeThrough(e1);
  let oStr1 = "";
  for await (const x of o1) {
    oStr1 += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr1, ",48,49");

  const e2 = new _Utf8.EncoderStream();
  const i2 = ReadableStream.from((function* () {
    yield "\uFEFF01";
  })());
  const o2 = i2.pipeThrough(e2);
  let oStr2 = "";
  for await (const x of o2) {
    oStr2 += `,${Array.from(x).join(",")}`;
  }
  assertStrictEquals(oStr2, ",239,187,191,48,49");

  const e2b = new _Utf8.EncoderStream();
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
  assertStrictEquals(oStr2b, ",239,187,191,48,49");

  const e3 = new _Utf8.EncoderStream();
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
  assertStrictEquals(oStr3, ",48,49,240,160,128,139");

  const e3b = new _Utf8.EncoderStream();
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
  assertStrictEquals(oStr3b, ",48,49,240,160,128,139");
});

Deno.test("_Utf8.EncoderStream - 孤立サロゲート", async () => {
  const e3b = new _Utf8.EncoderStream();
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
  assertStrictEquals(oStr3b, ",48,49,239,191,189");

  const e3c = new _Utf8.EncoderStream({ fatal: true });
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
    "Input must be a string that can be encoded in UTF-8",
  );
});
