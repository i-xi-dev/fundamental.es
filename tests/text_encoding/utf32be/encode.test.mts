import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf32Be.encode()", () => {
  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf32Be.encode("01")),
    "0,0,0,48,0,0,0,49",
  );

  //XXX prependBOM

  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf32Be.encode("\uFEFF01")),
    "0,0,254,255,0,0,0,48,0,0,0,49",
  );

  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf32Be.encode("01", { fatal: true })),
    "0,0,0,48,0,0,0,49",
  );

  assertStrictEquals(
    stringifyNumbers(
      TextEncoding.Utf32Be.encode("0\uD800\uDFFF1", { fatal: true }),
    ),
    "0,0,0,48,0,1,3,255,0,0,0,49",
  );

  assertThrows(
    () => {
      TextEncoding.Utf32Be.encode("0\uD8001", { fatal: true });
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-32BE",
  );

  assertStrictEquals(
    stringifyNumbers(TextEncoding.Utf32Be.encode("0\uD8001")),
    "0,0,0,48,0,0,255,253,0,0,0,49",
  );
});
