import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.fromString()", () => {
  const u0 = Uuid.fromString("01234567-89AB-CDEF-0123-456789ABCDEF");
  assertStrictEquals(u0.toString(), "01234567-89ab-cdef-0123-456789abcdef");

  const u1 = Uuid.fromString("urn:uuid:01234567-89AB-CDEF-0123-456789ABCDEF");
  assertStrictEquals(u1.toString(), "01234567-89ab-cdef-0123-456789abcdef");

  // const u2 = Uuid.fromString("0123456789ABCDEF0123456789ABCDEF");
  // assertStrictEquals(u2.toString(), "01234567-89ab-cdef-0123-456789abcdef");

  assertThrows(
    () => {
      Uuid.fromString(0 as unknown as string);
    },
    TypeError,
    "Input must be an UUID of type `string`",
  );

  assertThrows(
    () => {
      Uuid.fromString("01234567-89AB-CDEF-0123-456789ABCDE");
    },
    TypeError,
    "Input must be an UUID of type `string`",
  );

  assertThrows(
    () => {
      Uuid.fromString("01234567-89AB-CDEF-0123-456789ABCDEF0");
    },
    TypeError,
    "Input must be an UUID of type `string`",
  );

  assertThrows(
    () => {
      Uuid.fromString("0123456789ABCDEF0123456789ABCDEF");
    },
    TypeError,
    "Input must be an UUID of type `string`",
  );
});
