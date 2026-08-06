import { assertStrictEquals, assertThrows } from "@std/assert";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf8.Decoder", () => {
  const e1 = new TextEncoding.Utf8.Decoder();
  assertStrictEquals(e1.encoding, "utf-8");
  assertStrictEquals(e1.fatal, false);
  assertStrictEquals(e1.decode(Uint8Array.of(48, 49)), "01");

  const e4 = new TextEncoding.Utf8.Decoder();
  assertStrictEquals(
    e4.decode(Uint8Array.of(239, 187, 191, 48, 239, 187, 191, 49)),
    "0\uFEFF1",
  );

  const e4b = new TextEncoding.Utf8.Decoder({ ignoreBOM: true });
  assertStrictEquals(
    e4b.decode(Uint8Array.of(239, 187, 191, 48, 239, 187, 191, 49)),
    "\uFEFF0\uFEFF1",
  );

  const e5 = new TextEncoding.Utf8.Decoder({ fatal: true });
  assertStrictEquals(e5.encoding, "utf-8");
  assertStrictEquals(e5.fatal, true);
  assertStrictEquals(e5.decode(Uint8Array.of(48, 49)), "01");

  const e6 = new TextEncoding.Utf8.Decoder({ fatal: true });
  assertStrictEquals(
    e6.decode(Uint8Array.of(48, 240, 144, 143, 191, 49)),
    "0\uD800\uDFFF1",
  );

  assertThrows(
    () => {
      const e6e = new TextEncoding.Utf8.Decoder({ fatal: true });
      e6e.decode(Uint8Array.of(0xFF, 0xFF, 0xFF));
    },
    TypeError,
    "The encoded data is not valid", // V8が出したやつ
  );
});
