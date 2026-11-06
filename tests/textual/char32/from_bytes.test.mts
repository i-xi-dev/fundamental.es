import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Char32 } = Textuals;

Deno.test("Textuals.Char32.fromBytes()", () => {
  assertStrictEquals(Char32.fromBytes(Uint8Array.of(0)), "\u0000");
  assertStrictEquals(Char32.fromBytes(Uint8Array.of(0x7F)), "\u007F");
  assertStrictEquals(Char32.fromBytes(Uint8Array.of(0xC2, 0x80)), "\u0080");
  assertStrictEquals(
    Char32.fromBytes(Uint8Array.of(0xE0, 0xA0, 0x80)),
    "\u0800",
  );
  assertStrictEquals(
    Char32.fromBytes(Uint8Array.of(0xF0, 0x90, 0x80, 0x80)),
    "\u{10000}",
  );

  assertThrows(
    () => {
      Char32.fromBytes([0] as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an `Uint8Array` that references an `ArrayBuffer`",
  );

  assertThrows(
    () => {
      Char32.fromBytes(Uint8Array.of());
    },
    RangeError,
    "Input must be a byte sequence consisting of 1 to 4 bytes",
  );

  assertThrows(
    () => {
      Char32.fromBytes(Uint8Array.of(0, 0, 0, 0, 0));
    },
    RangeError,
    "Input must be a byte sequence consisting of 1 to 4 bytes",
  );

  assertThrows(
    () => {
      Char32.fromBytes(Uint8Array.of(0x80, 0x80, 0x80, 0x80));
    },
    RangeError,
    "Input must be a valid UTF-8 encoded byte sequence",
  );

  assertThrows(
    () => {
      Char32.fromBytes(Uint8Array.of(0x7F, 0x7F, 0x7F, 0x7F));
    },
    RangeError,
    "Input must be a valid UTF-8 encoded byte sequence representing a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.fromBytes(Uint8Array.of(0x7F, 0x7F, 0x7F));
    },
    RangeError,
    "Input must be a valid UTF-8 encoded byte sequence representing a well-formed single character",
  );

  assertThrows(
    () => {
      Char32.fromBytes(Uint8Array.of(0x7F, 0x7F));
    },
    RangeError,
    "Input must be a valid UTF-8 encoded byte sequence representing a well-formed single character",
  );
});
