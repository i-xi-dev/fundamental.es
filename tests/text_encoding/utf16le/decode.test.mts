import { assertStrictEquals, assertThrows } from "@std/assert";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf16Le.decode()", () => {
  assertStrictEquals(
    TextEncoding.Utf16Le.decode(Uint8Array.of(48, 0, 49, 0)),
    "01",
  );

  assertStrictEquals(
    TextEncoding.Utf16Le.decode(
      Uint8Array.of(0xFF, 0xFE, 48, 0, 0xFF, 0xFE, 49, 0),
    ),
    "0\uFEFF1",
  );

  assertStrictEquals(
    TextEncoding.Utf16Le.decode(
      Uint8Array.of(0xFF, 0xFE, 48, 0, 0xFF, 0xFE, 49, 0),
      { ignoreBom: true },
    ),
    "\uFEFF0\uFEFF1",
  );

  assertStrictEquals(
    TextEncoding.Utf16Le.decode(Uint8Array.of(48, 0, 49, 0), { fatal: true }),
    "01",
  );

  assertStrictEquals(
    TextEncoding.Utf16Le.decode(
      Uint8Array.of(48, 0, 0, 0xD8, 0xFF, 0xDF, 49, 0),
      { fatal: true },
    ),
    "0\uD800\uDFFF1",
  );

  assertThrows(
    () => {
      TextEncoding.Utf16Le.decode(Uint8Array.of(0, 0xD8), { fatal: true });
    },
    TypeError,
    "The encoded data is not valid", // V8が出したやつ
  );
});
