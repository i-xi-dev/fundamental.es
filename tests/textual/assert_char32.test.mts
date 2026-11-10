import { assertThrows } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

const { assertChar32 } = Textuals;

Deno.test("Textuals.assertChar32()", () => {
  assertChar32("\u0000", "T1");
  assertChar32("\uFFFF", "T2");
  assertChar32("\uD800\uDC00", "T5");

  assertThrows(
    () => {
      assertChar32("\uD800", "XX1");
    },
    TypeError,
    "XX1 must be a well-formed single character",
  );

  assertThrows(
    () => {
      assertChar32("\uDFFF", "XX2");
    },
    TypeError,
    "XX2 must be a well-formed single character",
  );

  assertThrows(
    () => {
      assertChar32(1 as unknown as string, "X1");
    },
    TypeError,
    "X1 must be a well-formed single character",
  );

  assertThrows(
    () => {
      assertChar32(null as unknown as string, "X2");
    },
    TypeError,
    "X2 must be a well-formed single character",
  );

  assertThrows(
    () => {
      assertChar32("", "X3");
    },
    TypeError,
    "X3 must be a well-formed single character",
  );

  assertThrows(
    () => {
      assertChar32("11", "X4");
    },
    TypeError,
    "X4 must be a well-formed single character",
  );

  assertThrows(
    () => {
      assertChar32("\uDC00\uD800", "X5");
    },
    TypeError,
    "X5 must be a well-formed single character",
  );
});
