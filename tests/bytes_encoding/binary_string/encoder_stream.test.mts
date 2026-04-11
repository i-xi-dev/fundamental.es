import * as BinaryString from "../../../src/bytes_encoding/binary_string/mod.mts";
import { assertStrictEquals } from "@std/assert";
import { delay } from "../../_.mts";

async function test1(
  input: Uint8Array<ArrayBuffer>[],
  expected: string,
): Promise<void> {
  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < input.length; i++) {
      await delay(10);
      yield input[i];
    }
  })());

  await delay(20);

  const encoder = new BinaryString.EncoderStream();

  let actual = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      actual = actual + chunk;
    },
  });

  await s.pipeThrough<string>(encoder).pipeTo(ws);

  assertStrictEquals(actual, expected);
}

Deno.test("BinaryString.Encoder", async () => {
  await test1([
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
  ], "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC");

  await test1(
    [
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
      ),
    ],
    "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002" +
      "\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000" +
      "\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF\u00FE" +
      "\u00FD\u00FC",
  );

  await test1([
    Uint8Array.of(0x03),
    Uint8Array.of(0x02),
    Uint8Array.of(0x01),
    Uint8Array.of(0x00),
    Uint8Array.of(0xFF),
    Uint8Array.of(0xFE),
    Uint8Array.of(0xFD),
    Uint8Array.of(0xFC),
  ], "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC");

  await test1(
    [
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
      ),
      Uint8Array.of(),
      Uint8Array.of(
        0x03,
        0x02,
      ),
      Uint8Array.of(
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
      ),
      Uint8Array.of(0xFC),
      Uint8Array.of(),
    ],
    "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002" +
      "\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000" +
      "\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF\u00FE" +
      "\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC" +
      "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002" +
      "\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000" +
      "\u00FF\u00FE\u00FD\u00FC",
  );
});
