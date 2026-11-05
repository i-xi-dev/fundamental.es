import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char32 } = Textuals;

function _test(c32: string, ex: Array<number>): void {
  assertStrictEquals(
    JSON.stringify([...Char32.toBytes(c32)]),
    JSON.stringify(ex),
  );
}

Deno.test("Textuals.Char32.toBytes()", () => {
  _test("\u0000", [0]);
  _test("\uFFFF", [0xEF, 0xBF, 0xBF]);
  _test("\u{10000}", [0xF0, 0x90, 0x80, 0x80]);
  _test("\u{10FFFF}", [0xF4, 0x8F, 0xBF, 0xBF]);

  assertThrows(
    () => {
      Char32.toBytes("\uD800");
    },
    TypeError,
    "Input must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.toBytes("\uDFFF");
    },
    TypeError,
    "Input must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.toBytes("");
    },
    TypeError,
    "Input must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.toBytes("00");
    },
    TypeError,
    "Input must be a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.toBytes(0 as unknown as string);
    },
    TypeError,
    "Input must be a well-formed single character",
  );
});
