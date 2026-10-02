import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../../_.mts";
import { Textuals } from "../../../../src/mod.mts";

Deno.test("Textuals.Encoding.Utf32Le.Encoder", () => {
  const e1 = new Textuals.Encoding.Utf32Le.Encoder();
  assertStrictEquals(e1.encoding, "utf-32le");
  assertStrictEquals(stringifyNumbers(e1.encode("01")), "48,0,0,0,49,0,0,0");

  //XXX prependBOM

  const e4 = new Textuals.Encoding.Utf32Le.Encoder();
  assertStrictEquals(
    stringifyNumbers(e4.encode("\uFEFF01")),
    "255,254,0,0,48,0,0,0,49,0,0,0",
  );

  const e5 = new Textuals.Encoding.Utf32Le.Encoder({ fatal: true });
  assertStrictEquals(e5.encoding, "utf-32le");
  assertStrictEquals(stringifyNumbers(e5.encode("01")), "48,0,0,0,49,0,0,0");

  const e6 = new Textuals.Encoding.Utf32Le.Encoder({ fatal: true });
  assertStrictEquals(
    stringifyNumbers(e6.encode("0\uD800\uDFFF1")),
    "48,0,0,0,255,3,1,0,49,0,0,0",
  );

  assertThrows(
    () => {
      const e6e = new Textuals.Encoding.Utf32Le.Encoder({ fatal: true });
      e6e.encode("0\uD8001");
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-32LE",
  );

  const e6a = new Textuals.Encoding.Utf32Le.Encoder();
  assertStrictEquals(
    stringifyNumbers(e6a.encode("0\uD8001")),
    "48,0,0,0,253,255,0,0,49,0,0,0",
  );
});
