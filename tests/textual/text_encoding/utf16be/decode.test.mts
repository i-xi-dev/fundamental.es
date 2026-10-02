import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../../src/mod.mts";

Deno.test("Textuals.Encoding.Utf16Be.decode()", () => {
  assertStrictEquals(
    Textuals.Encoding.Utf16Be.decode(Uint8Array.of(0, 48, 0, 49)),
    "01",
  );

  assertStrictEquals(
    Textuals.Encoding.Utf16Be.decode(
      Uint8Array.of(0xFE, 0xFF, 0, 48, 0xFE, 0xFF, 0, 49),
    ),
    "0\uFEFF1",
  );

  assertStrictEquals(
    Textuals.Encoding.Utf16Be.decode(
      Uint8Array.of(0xFE, 0xFF, 0, 48, 0xFE, 0xFF, 0, 49),
      { ignoreBom: true },
    ),
    "\uFEFF0\uFEFF1",
  );

  assertStrictEquals(
    Textuals.Encoding.Utf16Be.decode(Uint8Array.of(0, 48, 0, 49), {
      fatal: true,
    }),
    "01",
  );

  assertStrictEquals(
    Textuals.Encoding.Utf16Be.decode(
      Uint8Array.of(0, 48, 0xD8, 0, 0xDF, 0xFF, 0, 49),
      { fatal: true },
    ),
    "0\uD800\uDFFF1",
  );

  assertThrows(
    () => {
      Textuals.Encoding.Utf16Be.decode(Uint8Array.of(0xD8, 0), { fatal: true });
    },
    TypeError,
    "The encoded data is not valid", // V8が出したやつ
  );
});
