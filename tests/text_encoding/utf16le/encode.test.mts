import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf16Le.encode()", () => {
  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf16Le.encode("01")),
    "48,0,49,0",
  );

  //XXX prependBOM

  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf16Le.encode("\uFEFF01")),
    "255,254,48,0,49,0",
  );

  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf16Le.encode("01", { fatal: true })),
    "48,0,49,0",
  );

  assertStrictEquals(
    stringifyNumbers(
      TextEncoding.Utf16Le.encode("0\uD800\uDFFF1", { fatal: true }),
    ),
    "48,0,0,216,255,223,49,0",
  );

  assertThrows(
    () => {
      TextEncoding.Utf16Le.encode("0\uD8001", { fatal: true });
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-16LE",
  );

  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf16Le.encode("0\uD8001")),
    "48,0,253,255,49,0",
  );
});
