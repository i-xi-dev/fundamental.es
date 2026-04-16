import * as BinaryString from "../../../src/bytes_encoding/binary_string/mod.mts";
import { assertStrictEquals, assertThrows } from "@std/assert";

function test1(input: string, expected: Uint8Array<ArrayBuffer>): void {
  const actual = BinaryString.decode(input);

  assertStrictEquals(actual.length, expected.length);
  for (let i = 0; i < expected.length; i++) {
    assertStrictEquals(actual[i], expected[i]);
  }
}

Deno.test("BinaryString.decode()", () => {
  test1(
    "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0000\u0000",
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC, 0x00, 0x00),
  );
});

Deno.test("BinaryString.decode() - error", () => {
  assertThrows(
    () => {
      test1(
        "\u0003\u0002\u0001\u0000\u00FF\u00FE\u00FD\u00FC\u0100\u0000",
        new Uint8Array(100),
      );
    },
    SyntaxError,
    "Input string must not contain characters outside of the Latin1 range",
  );
});
