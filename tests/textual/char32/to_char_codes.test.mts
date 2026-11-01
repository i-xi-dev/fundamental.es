import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char32 } = Textuals;

function _test(c32: string, ex: Array<number>): void {
  assertStrictEquals(
    JSON.stringify(Char32.toUint16s(c32)),
    JSON.stringify(ex),
  );
}

Deno.test("Textuals.Char32.toUint16s()", () => {
  _test("\u0000", [0]);
  _test("\uFFFF", [0xFFFF]);
  _test("\uD800", [0xD800]);
  _test("\uDFFF", [0xDFFF]);
  _test("\u{10000}", [0xD800, 0xDC00]);
  _test("\u{10FFFF}", [0xDBFF, 0xDFFF]);

  assertThrows(
    () => {
      Char32.toUint16s("");
    },
    TypeError,
    "Input must be a single character",
  );

  assertThrows(
    () => {
      Char32.toUint16s("00");
    },
    TypeError,
    "Input must be a single character",
  );

  assertThrows(
    () => {
      Char32.toUint16s(0 as unknown as string);
    },
    TypeError,
    "Input must be a single character",
  );
});
