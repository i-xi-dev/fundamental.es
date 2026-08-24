import { assertStrictEquals, assertThrows } from "@std/assert";
import { TextEncoding } from "../../../src/mod.mts";

Deno.test("TextEncoding.Utf8.decode()", () => {
  assertStrictEquals(TextEncoding.Utf8.decode(Uint8Array.of(48, 49)), "01");

  assertStrictEquals(
    TextEncoding.Utf8.decode(
      Uint8Array.of(239, 187, 191, 48, 239, 187, 191, 49),
    ),
    "0\uFEFF1",
  );

  assertStrictEquals(
    TextEncoding.Utf8.decode(
      Uint8Array.of(239, 187, 191, 48, 239, 187, 191, 49),
      { ignoreBOM: true },
    ),
    "\uFEFF0\uFEFF1",
  );

  assertStrictEquals(
    TextEncoding.Utf8.decode(Uint8Array.of(48, 49), { fatal: true }),
    "01",
  );

  assertStrictEquals(
    TextEncoding.Utf8.decode(Uint8Array.of(48, 240, 144, 143, 191, 49), {
      fatal: true,
    }),
    "0\uD800\uDFFF1",
  );

  assertThrows(
    () => {
      TextEncoding.Utf8.decode([] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      TextEncoding.Utf8.decode(Uint8Array.of(0xFF, 0xFF, 0xFF), {
        fatal: true,
      });
    },
    TypeError,
    "The encoded data is not valid", // V8が出したやつ
  );
});
