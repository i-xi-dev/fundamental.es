import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../../_.mts";
import { Textuals } from "../../../../src/mod.mts";

Deno.test("Textuals.Encoding.Utf32Le.encode()", () => {
  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf32Le.encode("01")),
    "48,0,0,0,49,0,0,0",
  );

  //XXX prependBOM

  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf32Le.encode("\uFEFF01")),
    "255,254,0,0,48,0,0,0,49,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf32Le.encode("01", { fatal: true })),
    "48,0,0,0,49,0,0,0",
  );

  assertStrictEquals(
    stringifyNumbers(
      Textuals.Encoding.Utf32Le.encode("0\uD800\uDFFF1", { fatal: true }),
    ),
    "48,0,0,0,255,3,1,0,49,0,0,0",
  );

  assertThrows(
    () => {
      Textuals.Encoding.Utf32Le.encode("0\uD8001", { fatal: true });
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-32LE",
  );

  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf32Le.encode("0\uD8001")),
    "48,0,0,0,253,255,0,0,49,0,0,0",
  );
});
