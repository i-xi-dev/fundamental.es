import { assertStrictEquals } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";
import { delay } from "../../_.mts";

const { EncoderStream } = BytesEncoding.Hex;

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

  const encoder = new EncoderStream();

  let actual = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      actual = actual + chunk;
    },
  });

  await s.pipeThrough<string>(encoder).pipeTo(ws);

  assertStrictEquals(actual, expected);
}

Deno.test("BytesEncoding.Hex.EncoderStream", async () => {
  await test1([
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
  ], "03020100fffefdfc");

  await test1([
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
  ], "03020100fffefdfc03020100fffefdfc03020100fffefdfc03020100fffefdfc");

  await test1([
    Uint8Array.of(0x03),
    Uint8Array.of(0x02),
    Uint8Array.of(0x01),
    Uint8Array.of(0x00),
    Uint8Array.of(0xFF),
    Uint8Array.of(0xFE),
    Uint8Array.of(0xFD),
    Uint8Array.of(0xFC),
  ], "03020100fffefdfc");

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
    "03020100fffefdfc03020100fffefdfc03020100fffefdfc03020100fffefdfc03020100fffefdfc03020100fffefdfc03020100fffefdfc03020100fffefdfc",
  );
});
