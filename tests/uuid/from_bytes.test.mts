import { assertStrictEquals, assertThrows } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.fromBytes()", () => {
  const u0 = Uuid.fromBytes(
    Uint8Array.fromHex("0123456789ABCDEF0123456789ABCDEF"),
  );
  assertStrictEquals(u0.toString(), "01234567-89ab-cdef-0123-456789abcdef");

  assertThrows(
    () => {
      Uuid.fromBytes(0 as unknown as Uint8Array<ArrayBuffer>);
    },
    TypeError,
    "Input must be an UUID bytes of type `Uint8Array`",
  );

  assertThrows(
    () => {
      Uuid.fromBytes(new Uint8Array(15));
    },
    TypeError,
    "Input must be an UUID bytes of type `Uint8Array`",
  );

  assertThrows(
    () => {
      Uuid.fromBytes(new Uint8Array(17));
    },
    TypeError,
    "Input must be an UUID bytes of type `Uint8Array`",
  );
});
