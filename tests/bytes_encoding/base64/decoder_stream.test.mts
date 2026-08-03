import { assertRejects, assertStrictEquals } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";
import { delay } from "../../_.mts";

type DecoderOptions = BytesEncoding.Base64.DecoderOptions;
const { DecoderStream } = BytesEncoding.Base64;

async function test1(
  input: string[],
  expected: Uint8Array<ArrayBuffer>,
  decoderOptions?: DecoderOptions,
): Promise<void> {
  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < input.length; i++) {
      await delay(10);
      yield input[i];
    }
  })());

  await delay(20);

  const decoder = new DecoderStream(decoderOptions);

  const actual = new Uint8Array(expected.length);
  let written = 0;
  const ws = new WritableStream<Uint8Array<ArrayBuffer>>({
    write(chunk: Uint8Array<ArrayBuffer>) {
      actual.set(chunk, written);
      written = written + chunk.byteLength;
    },
    abort(reason) {
      console.log("UnderlyingSink.abort");
      //       //console.log(reason);
      //       assertStrictEquals(reason.name, "SyntaxError");
      //       assertStrictEquals(
      //         reason.message,
      //         "Found a character that cannot be part of a valid base64 string.",
      //       );
    },
  });

  await s.pipeThrough<Uint8Array<ArrayBuffer>>(decoder).pipeTo(ws);

  assertStrictEquals(actual.length, expected.length);
  for (let i = 0; i < expected.length; i++) {
    assertStrictEquals(actual[i], expected[i]);
  }
}

Deno.test("BytesEncoding.Base64.DecoderStream", async () => {
  await test1(
    ["AwIBAP/+/fw="],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );

  await test1(
    ["AwIBAP/+/fw"],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );

  await test1(
    ["AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw="],
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
    ["A", "w", "I", "B", "A", "P", "/", "+", "/", "f", "w", "="],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );

  await test1(
    [
      "AwIBAP/+/fwDAgEA//79/AMC",
      "AQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIB",
      "AP/+/fwDAgEA//79/A=",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "=",
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

Deno.test("BytesEncoding.Base64.DecoderStream - alphabet:base64url", async () => {
  await test1(
    ["AwIBAP_-_fw="],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
    { alphabet: "base64url" },
  );
});

Deno.test("BytesEncoding.Base64.DecoderStream - lastChunkHandling:strict", async () => {
  await test1(
    ["AwIBAP/+/fw="],
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
    { lastChunkHandling: "strict" },
  );

  await assertRejects(
    async () => {
      await test1(
        ["AwIBAP/+/fw"],
        new Uint8Array(100),
        { lastChunkHandling: "strict" },
      );
    },
    SyntaxError,
    "The base64 input terminates with a single character, excluding padding (=).",
  );
});

Deno.test("BytesEncoding.Base64.DecoderStream - error", async () => {
  await assertRejects(
    async () => {
      await test1(
        ["A", "w", "あ", "B", "A", "P", "/", "+", "/", "f", "w", "="],
        new Uint8Array(100),
      );
    },
    SyntaxError,
    "Found a character that cannot be part of a valid base64 string.",
  );

  await assertRejects(
    async () => {
      await test1(
        ["AwIBAP/+/fw="],
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
        { alphabet: "base64url" },
      );
    },
    SyntaxError,
    "Found a character that cannot be part of a valid base64 string.",
  );
});
