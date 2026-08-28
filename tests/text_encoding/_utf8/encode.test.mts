import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import * as _Utf8 from "../../../src/text_encoding/_utf8/mod.mts";

Deno.test("_Utf8.encode()", () => {
  assertStrictEquals(stringifyNumbers(_Utf8.encode("01")), "48,49");

  assertStrictEquals(
    stringifyNumbers(_Utf8.encode("01", { prependBOM: true })),
    "239,187,191,48,49",
  );

  assertStrictEquals(
    stringifyNumbers(
      _Utf8.encode("\uFEFF01", { prependBOM: true }),
    ),
    "239,187,191,48,49",
  );

  assertStrictEquals(
    stringifyNumbers(_Utf8.encode("\uFEFF01")),
    "239,187,191,48,49",
  );

  assertStrictEquals(
    stringifyNumbers(_Utf8.encode("01", { fatal: true })),
    "48,49",
  );

  assertStrictEquals(
    stringifyNumbers(
      _Utf8.encode("0\uD800\uDFFF1", { fatal: true }),
    ),
    "48,240,144,143,191,49",
  );

  assertThrows(
    () => {
      _Utf8.encode([] as unknown as string);
    },
    TypeError,
    "Input must be a `string`",
  );

  assertThrows(
    () => {
      _Utf8.encode("0\uD8001", { fatal: true });
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-8",
  );
});
