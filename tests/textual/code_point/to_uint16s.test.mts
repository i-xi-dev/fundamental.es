import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePoint } = Textuals;

function _test(cp: number, ex: Array<number>): void {
  assertStrictEquals(
    JSON.stringify(CodePoint.toUint16s(cp)),
    JSON.stringify(ex),
  );
}

Deno.test("Textuals.CodePoint.toUint16s()", () => {
  _test(0, [0]);
  _test(0xFFFF, [0xFFFF]);
  _test(0xD800, [0xD800]);
  _test(0xDFFF, [0xDFFF]);
  _test(0x10000, [0xD800, 0xDC00]);
  _test(0x10FFFF, [0xDBFF, 0xDFFF]);

  // for (let i = 0; i <= 0xFFFF; i++) {
  //   _test(i, [i]);
  // }
  // for (let i = 0x10000; i <= 0x10FFFF; i++) {
  //   const c = String.fromCodePoint(i);
  //   _test(i, [c.charCodeAt(0), c.charCodeAt(1)]);
  // }

  assertThrows(
    () => {
      CodePoint.toUint16s(-1);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.toUint16s(0x110000);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );

  assertThrows(
    () => {
      CodePoint.toUint16s("1" as unknown as number);
    },
    TypeError,
    "Input must be a Unicode code point of type `number`",
  );
});
