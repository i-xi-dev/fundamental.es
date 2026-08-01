import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.prototype.toBytes()", () => {
  assertStrictEquals(
    Uuid.fromString("01234567-89AB-CDEF-0123-456789ABCDEF").toBytes().toHex(),
    "0123456789abcdef0123456789abcdef",
  );
});
