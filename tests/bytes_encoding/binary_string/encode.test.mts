import * as BinaryString from "../../../src/bytes_encoding/binary_string/mod.mts";
import { assertStrictEquals } from "@std/assert";

function test1(
  input: Uint8Array<ArrayBuffer>,
  expected: string,
): void {
  const actual = BinaryString.encode(input);
  assertStrictEquals(actual, expected);
}

Deno.test("BinaryString.Encoder", () => {
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
