import { assertStrictEquals } from "std/testing/asserts";
import { Byte } from "../src/byte.ts";

Deno.test("Byte.isUint8", () => {
  // Byte.isUint8(number)
  assertStrictEquals(Byte.isUint8(-1), false);
  assertStrictEquals(Byte.isUint8(-0), true);
  assertStrictEquals(Byte.isUint8(0), true);
  assertStrictEquals(Byte.isUint8(255), true);
  assertStrictEquals(Byte.isUint8(256), false);
  assertStrictEquals(Byte.isUint8(0.1), false);

  // Byte.isUint8(any)
  assertStrictEquals(Byte.isUint8("0"), false);
  assertStrictEquals(Byte.isUint8("255"), false);
  assertStrictEquals(Byte.isUint8(true), false);
  assertStrictEquals(Byte.isUint8({}), false);
  assertStrictEquals(Byte.isUint8([]), false);
  assertStrictEquals(Byte.isUint8([0]), false);
  assertStrictEquals(Byte.isUint8(undefined), false);
  assertStrictEquals(Byte.isUint8(null), false);
});
