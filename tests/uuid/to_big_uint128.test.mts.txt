import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.prototype.toBigUint128()", () => {
  assertStrictEquals(
    Uuid.fromString("01234567-89ab-cdef-0123-456789abcdef").toBigUint128(),
    0x0123456789ABCDEF0123456789ABCDEFn,
  );
});
