import { assertStrictEquals, assertThrows } from "@std/assert";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf16Be.Decoder", () => {
  const e1 = new TextEncoding.Utf16Be.Decoder();
  assertStrictEquals(e1.encoding, "utf-16be");
  assertStrictEquals(e1.decode(Uint8Array.of(0, 48, 0, 49)), "01");

  const e4 = new TextEncoding.Utf16Be.Decoder();
  assertStrictEquals(
    e4.decode(Uint8Array.of(0xFE, 0xFF, 0, 48, 0xFE, 0xFF, 0, 49)),
    "0\uFEFF1",
  );

  const e4b = new TextEncoding.Utf16Be.Decoder({ ignoreBOM: true });
  assertStrictEquals(
    e4b.decode(Uint8Array.of(0xFE, 0xFF, 0, 48, 0xFE, 0xFF, 0, 49)),
    "\uFEFF0\uFEFF1",
  );

  const e5 = new TextEncoding.Utf16Be.Decoder({ fatal: true });
  assertStrictEquals(e5.encoding, "utf-16be");
  assertStrictEquals(e5.decode(Uint8Array.of(0, 48, 0, 49)), "01");

  const e6 = new TextEncoding.Utf16Be.Decoder({ fatal: true });
  assertStrictEquals(
    e6.decode(Uint8Array.of(0, 48, 0xD8, 0, 0xDF, 0xFF, 0, 49)),
    "0\uD800\uDFFF1",
  );

  assertThrows(
    () => {
      const e6e = new TextEncoding.Utf16Be.Decoder({ fatal: true });
      e6e.decode(Uint8Array.of(0xD8, 0));
    },
    TypeError,
    "The encoded data is not valid", // V8が出したやつ
  );
});
