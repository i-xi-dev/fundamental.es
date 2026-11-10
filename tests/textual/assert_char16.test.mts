import { assertThrows } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

const { assertChar16 } = Textuals;

Deno.test("Textuals.assertChar16()", () => {
  assertChar16("\u0000", "T1");
  assertChar16("\uFFFF", "T2");
  assertChar16("\uD800", "T3");
  assertChar16("\uDFFF", "T4");

  assertThrows(
    () => {
      assertChar16(1 as unknown as string, "X1");
    },
    TypeError,
    "X1 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      assertChar16(null as unknown as string, "X2");
    },
    TypeError,
    "X2 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      assertChar16("", "X3");
    },
    TypeError,
    "X3 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      assertChar16("11", "X4");
    },
    TypeError,
    "X4 must be a single character with a code point of `0xFFFF` or lower",
  );

  assertThrows(
    () => {
      assertChar16("\u{10000}", "X5");
    },
    TypeError,
    "X5 must be a single character with a code point of `0xFFFF` or lower",
  );
});
