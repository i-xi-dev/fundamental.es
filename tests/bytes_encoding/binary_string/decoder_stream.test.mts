import * as BinaryString from "../../../src/bytes_encoding/binary_string/mod.mts";
import { assertRejects, assertStrictEquals } from "@std/assert";
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

  const decoder = new BinaryString.DecoderStream();

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
      //   "-",
      // );
    },
  });

  await s.pipeThrough<Uint8Array<ArrayBuffer>>(decoder).pipeTo(ws);

  assertStrictEquals(actual.length, expected.length);
  for (let i = 0; i < expected.length; i++) {
    assertStrictEquals(actual[i], expected[i]);
  }
}

Deno.test("BinaryString.DecoderStream", async () => {
  await test1(
    ["\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0000\u0000"],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );

  await test1(
    [
      "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002" +
      "\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000" +
      "\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF\u00FE" +
      "\u00FD\u00FC\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
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
      "\u0003",
      "\u0002",
      "\u0001",
      "\u0000",
      "\u00FF",
      "\u00FE",
      "\u00FD",
      "\u00FC",
      "\u0000",
      "\u0000",
    ],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );

  await test1(
    [
      "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002",
      "\u0001",
      "\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF" +
      "\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD" +
      "\u00FC\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003" +
      "\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001" +
      "\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF" +
      "\u00FE\u00FD\u00FC\u0000\u0000\u0000\u0000\u0000",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "\u0000",
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

Deno.test("BinaryString.DecoderStream - error", async () => {
  await assertRejects(
    async () => {
      await test1(
        [
          "\u0003",
          "\u0002",
          "\u0001",
          "\u0000",
          "\u0100", // レンジ外
        ],
        new Uint8Array(100),
      );
    },
    SyntaxError,
    "Input string must not contain characters outside of the Latin1 range",
  );
});
