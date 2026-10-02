import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../../_.mts";
import { Textuals } from "../../../../src/mod.mts";

Deno.test("Textuals.Encoding.Utf16Be.encode()", () => {
  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf16Be.encode("01")),
    "0,48,0,49",
  );

  //XXX prependBOM

  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf16Be.encode("\uFEFF01")),
    "254,255,0,48,0,49",
  );

  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf16Be.encode("01", { fatal: true })),
    "0,48,0,49",
  );

  assertStrictEquals(
    stringifyNumbers(
      Textuals.Encoding.Utf16Be.encode("0\uD800\uDFFF1", { fatal: true }),
    ),
    "0,48,216,0,223,255,0,49",
  );

  assertThrows(
    () => {
      Textuals.Encoding.Utf16Be.encode("0\uD8001", { fatal: true });
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-16BE",
  );

  assertStrictEquals(
    stringifyNumbers(Textuals.Encoding.Utf16Be.encode("0\uD8001")),
    "0,48,255,253,0,49",
  );
});
