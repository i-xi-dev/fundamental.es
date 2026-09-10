import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf32Be.Encoder", () => {
  const e1 = new TextEncoding.Utf32Be.Encoder();
  assertStrictEquals(e1.encoding, "utf-32be");
  assertStrictEquals(stringifyNumbers(e1.encode("01")), "0,0,0,48,0,0,0,49");

  //XXX prependBOM

  const e4 = new TextEncoding.Utf32Be.Encoder();
  assertStrictEquals(
    stringifyNumbers(e4.encode("\uFEFF01")),
    "0,0,254,255,0,0,0,48,0,0,0,49",
  );

  const e5 = new TextEncoding.Utf32Be.Encoder({ fatal: true });
  assertStrictEquals(e5.encoding, "utf-32be");
  assertStrictEquals(stringifyNumbers(e5.encode("01")), "0,0,0,48,0,0,0,49");

  const e6 = new TextEncoding.Utf32Be.Encoder({ fatal: true });
  assertStrictEquals(
    stringifyNumbers(e6.encode("0\uD800\uDFFF1")),
    "0,0,0,48,0,1,3,255,0,0,0,49",
  );

  assertThrows(
    () => {
      const e6e = new TextEncoding.Utf32Be.Encoder({ fatal: true });
      e6e.encode("0\uD8001");
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-32BE",
  );

  const e6a = new TextEncoding.Utf32Be.Encoder();
  assertStrictEquals(
    stringifyNumbers(e6a.encode("0\uD8001")),
    "0,0,0,48,0,0,255,253,0,0,0,49",
  );
});
