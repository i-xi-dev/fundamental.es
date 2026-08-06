import { assertStrictEquals, assertThrows } from "@std/assert";
import { stringifyNumbers } from "../../_.mts";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf8.Encoder", () => {
  const e1 = new TextEncoding.Utf8.Encoder();
  assertStrictEquals(e1.encoding, "utf-8");
  assertStrictEquals(e1.fatal, false);
  assertStrictEquals(stringifyNumbers(e1.encode("01")), "48,49");

  const e2 = new TextEncoding.Utf8.Encoder({ prependBOM: true });
  assertStrictEquals(stringifyNumbers(e2.encode("01")), "239,187,191,48,49");

  const e3 = new TextEncoding.Utf8.Encoder({ prependBOM: true });
  assertStrictEquals(
    stringifyNumbers(e3.encode("\uFEFF01")),
    "239,187,191,48,49",
  );

  const e4 = new TextEncoding.Utf8.Encoder();
  assertStrictEquals(
    stringifyNumbers(e4.encode("\uFEFF01")),
    "239,187,191,48,49",
  );

  const e5 = new TextEncoding.Utf8.Encoder({ fatal: true });
  assertStrictEquals(e5.encoding, "utf-8");
  assertStrictEquals(e5.fatal, true);
  assertStrictEquals(stringifyNumbers(e5.encode("01")), "48,49");

  const e6 = new TextEncoding.Utf8.Encoder({ fatal: true });
  assertStrictEquals(
    stringifyNumbers(e6.encode("0\uD800\uDFFF1")),
    "48,240,144,143,191,49",
  );

  assertThrows(
    () => {
      const e6e = new TextEncoding.Utf8.Encoder({ fatal: true });
      e6e.encode("0\uD8001");
    },
    TypeError,
    "Input must be a string that can be encoded in UTF-8",
  );
});
