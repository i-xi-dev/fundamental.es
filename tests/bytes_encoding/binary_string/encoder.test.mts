import { assertStrictEquals, assertThrows } from "@std/assert";
import { BytesEncoding } from "../../../src/mod.mts";

const { Encoder } = BytesEncoding.BinaryString;

const encoder = new Encoder();

function test1(
  input: Uint8Array<ArrayBuffer>,
  expected: string,
): void {
  const actual = encoder.encode(input);
  assertStrictEquals(actual, expected);
}

Deno.test("BytesEncoding.BinaryString.Encoder.prototype.encode()", () => {
  test1(
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
    "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC",
  );

  test1(
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
    "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002" +
      "\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000" +
      "\u00FF\u00FE\u00FD\u00FC\u0003\u0002\u0001\u0000\u00FF\u00FE" +
      "\u00FD\u00FC",
  );
});

Deno.test("BytesEncoding.BinaryString.Encoder.prototype.encode() - error", () => {
  assertThrows(
    () => {
      test1(
        [] as unknown as Uint8Array<ArrayBuffer>,
        "000000000000000000000000000",
      );
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );
});
