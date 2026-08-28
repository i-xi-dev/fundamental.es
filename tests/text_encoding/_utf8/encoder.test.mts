import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import * as _Utf8 from "../../../src/text_encoding/_utf8/mod.mts";

Deno.test("_Utf8.Encoder", () => {
  const e1 = new _Utf8.Encoder();
  assertStrictEquals(e1.encoding, "utf-8");
  assertStrictEquals(stringifyNumbers(e1.encode("01")), "48,49");

  const e2 = new _Utf8.Encoder({ prependBOM: true });
  assertStrictEquals(stringifyNumbers(e2.encode("01")), "239,187,191,48,49");

  const e3 = new _Utf8.Encoder({ prependBOM: true });
  assertStrictEquals(
    stringifyNumbers(e3.encode("\uFEFF01")),
    "239,187,191,48,49",
  );

  const e4 = new _Utf8.Encoder();
  assertStrictEquals(
    stringifyNumbers(e4.encode("\uFEFF01")),
    "239,187,191,48,49",
  );

  const e5 = new _Utf8.Encoder({ fatal: true });
  assertStrictEquals(e5.encoding, "utf-8");
  assertStrictEquals(stringifyNumbers(e5.encode("01")), "48,49");

  const e6 = new _Utf8.Encoder({ fatal: true });
  assertStrictEquals(
    stringifyNumbers(e6.encode("0\uD800\uDFFF1")),
    "48,240,144,143,191,49",
  );

  assertThrows(
    () => {
      const e6e = new _Utf8.Encoder({ fatal: true });
      e6e.encode("0\uD8001");
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-8",
  );
});
