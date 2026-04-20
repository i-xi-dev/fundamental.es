import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../../../src/mod.mts";
import { delay } from "../../../_.mts";

type EncoderOptions = ByteSequence.Encoding.Base64.EncoderOptions;
const { EncoderStream } = ByteSequence.Encoding.Base64;

async function test1(
  input: Uint8Array<ArrayBuffer>[],
  expected: string,
  encoderOptions?: EncoderOptions,
): Promise<void> {
  const s = ReadableStream.from((async function* () {
    for (let i = 0; i < input.length; i++) {
      await delay(10);
      yield input[i];
    }
  })());

  await delay(20);

  const encoder = new EncoderStream(encoderOptions);

  let actual = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      actual = actual + chunk;
    },
  });

  await s.pipeThrough<string>(encoder).pipeTo(ws);

  assertStrictEquals(actual, expected);
}

Deno.test("ByteSequence.Encoding.Base64.EncoderStream", async () => {
  await test1([
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
  ], "AwIBAP/+/fw=");

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
  ], "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw=");

  await test1([
    Uint8Array.of(0x03),
    Uint8Array.of(0x02),
    Uint8Array.of(0x01),
    Uint8Array.of(0x00),
    Uint8Array.of(0xFF),
    Uint8Array.of(0xFE),
    Uint8Array.of(0xFD),
    Uint8Array.of(0xFC),
  ], "AwIBAP/+/fw=");

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
    "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/A==",
  );
});

Deno.test("ByteSequence.Encoding.Base64.EncoderStream - alphabet:base64url", async () => {
  await test1(
    [
      Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
    ],
    "AwIBAP_-_fw=",
    { alphabet: "base64url" },
  );
});

Deno.test("ByteSequence.Encoding.Base64.EncoderStream - omitPadding:true", async () => {
  await test1(
    [
      Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
    ],
    "AwIBAP/+/fw",
    { omitPadding: true },
  );
});
