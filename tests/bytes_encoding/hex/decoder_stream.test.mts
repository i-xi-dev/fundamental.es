import { assertRejects, assertStrictEquals } from "@std/assert";
import * as Hex from "../../../src/bytes_encoding/hex/mod.mts";
import { delay } from "../../_.mts";

async function test1(
  input: string[],
  expected: Uint8Array<ArrayBuffer>,
): Promise<void> {
  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < input.length; i++) {
      await delay(10);
      yield input[i];
    }
  })());

  await delay(20);

  const decoder = new Hex.DecoderStream();

  const actual = new Uint8Array(expected.length);
  let written = 0;
  const ws = new WritableStream<Uint8Array<ArrayBuffer>>({
    write(chunk: Uint8Array<ArrayBuffer>) {
      actual.set(chunk, written);
      written = written + chunk.byteLength;
    },
    abort(reason) {
      console.log("UnderlyingSink.abort");
      // // console.log(reason);
      // assertStrictEquals(reason.name, "SyntaxError");
      // assertStrictEquals(
      //   reason.message,
      //   "Input string must contain hex characters in even length",
      // );
    },
  });

  await s.pipeThrough<Uint8Array<ArrayBuffer>>(decoder).pipeTo(ws);

  assertStrictEquals(expected.length, actual.length);
  for (let i = 0; i < expected.length; i++) {
    assertStrictEquals(expected[i], actual[i]);
  }
}

Deno.test("Hex.DecoderStream", async () => {
  await test1(
    ["03020100FFFEFDFC0000"],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );

  await test1(
    ["03020100FFFEFDFC03020100FFFEFDFC03020100FFFEFDFC03020100FFFEFDFC0000000000000000"],
    Uint8Array.of(
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
    ),
  );

  await test1(
    [
      "0",
      "3",
      "0",
      "2",
      "0",
      "1",
      "0",
      "0",
      "F",
      "F",
      "F",
      "E",
      "F",
      "D",
      "F",
      "C",
      "0",
      "0",
      "0",
      "0",
    ],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );

  await test1(
    [
      "03020100FFFEFDFC03020",
      "1",
      "00FFFEFDFC03020100FFFEFDFC03020100FFFEFDFC03020100FFFEFDFC03020100FFFEFDFC03020100FFFEFDFC03020100FFFEFDFC00000000000",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "0",
      "",
    ],
    Uint8Array.of(
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
    ),
  );
});

Deno.test("Hex.DecoderStream - error", async () => {
  await assertRejects(
    async () => {
      await test1(
        [
          "0",
          "3",
          "0",
          "2",
          "0",
          "1",
          "0",
          "0",
          "G", // レンジ外
          "F",
          "F",
          "E",
          "F",
          "D",
          "F",
          "C",
          "0",
          "0",
          "0",
          "0",
        ],
        new Uint8Array(100),
      );
    },
    SyntaxError,
    "Input string must contain hex characters in even length",
  );

  await assertRejects(
    async () => {
      await test1(
        ["03020100FFFEFDFC000"], // 文字数:奇数
        Uint8Array.of(
          0x03,
          0x02,
          0x01,
          0x00,
          0xFF,
          0xFE,
          0xFD,
          0xFC,
          0x00,
          0x00,
        ),
      );
    },
    SyntaxError,
    "Input string must contain hex characters in even length",
  );
});
