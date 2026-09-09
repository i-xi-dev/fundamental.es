import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf16Le.Encoder", () => {
  const e1 = new TextEncoding.Utf16Le.Encoder();
  assertStrictEquals(e1.encoding, "utf-16le");
  assertStrictEquals(stringifyNumbers(e1.encode("01")), "48,0,49,0");

  //XXX prependBOM

  const e4 = new TextEncoding.Utf16Le.Encoder();
  assertStrictEquals(
    stringifyNumbers(e4.encode("\uFEFF01")),
    "255,254,48,0,49,0",
  );

  const e5 = new TextEncoding.Utf16Le.Encoder({ fatal: true });
  assertStrictEquals(e5.encoding, "utf-16le");
  assertStrictEquals(stringifyNumbers(e5.encode("01")), "48,0,49,0");

  const e6 = new TextEncoding.Utf16Le.Encoder({ fatal: true });
  assertStrictEquals(
    stringifyNumbers(e6.encode("0\uD800\uDFFF1")),
    "48,0,0,216,255,223,49,0",
  );

  assertThrows(
    () => {
      const e6e = new TextEncoding.Utf16Le.Encoder({ fatal: true });
      e6e.encode("0\uD8001");
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-16LE",
  );

  const e6a = new TextEncoding.Utf16Le.Encoder();
  assertStrictEquals(
    stringifyNumbers(e6a.encode("0\uD8001")),
    "48,0,253,255,49,0",
  );
});
