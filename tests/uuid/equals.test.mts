import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.prototype.equals()", () => {
  const u0 = Uuid.fromString("01234567-89AB-CDEF-0123-456789ABCDEF");

  assertStrictEquals(u0.equals("01234567-89AB-CDEF-0123-456789ABCDEF"), true);
  assertStrictEquals(u0.equals("01234567-89ab-cdef-0123-456789abcdef"), true);
  assertStrictEquals(
    u0.equals("urn:uuid:01234567-89ab-cdef-0123-456789abcdef"),
    true,
  );
  assertStrictEquals(u0.equals("0123456789ABCDEF0123456789ABCDEF"), false);

  assertStrictEquals(u0.equals(u0), true);
  assertStrictEquals(
    u0.equals(Uuid.fromString("01234567-89AB-CDEF-0123-456789ABCDEF")),
    true,
  );

  assertStrictEquals(
    u0.equals(Uint8Array.fromHex("0123456789ABCDEF0123456789ABCDEF")),
    true,
  );
  assertStrictEquals(
    u0.equals(Uint8Array.fromHex("0124456789ABCDEF0123456789ABCDEF")),
    false,
  );
  assertStrictEquals(
    u0.equals(Uint8Array.fromHex("0123456789ABCDEF0123456789ABCDEF00")),
    false,
  );
  assertStrictEquals(
    u0.equals(Uint8Array.fromHex("0123456789ABCDEF0123456789ABCD")),
    false,
  );
});
