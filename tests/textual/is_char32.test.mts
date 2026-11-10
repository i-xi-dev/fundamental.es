import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

const { isChar32 } = Textuals;

Deno.test("Textuals.isChar32()", () => {
  assertStrictEquals(isChar32(""), false);
  assertStrictEquals(isChar32("\u0000"), true);
  assertStrictEquals(isChar32("1"), true);
  assertStrictEquals(isChar32("11"), false);
  assertStrictEquals(isChar32("\uFFFF"), true);
  assertStrictEquals(isChar32("\u{10000}"), true);
  assertStrictEquals(isChar32("\u{10000}\u{10000}"), false);
  assertStrictEquals(isChar32("\uD800"), false);
  assertStrictEquals(isChar32("\uDFFF"), false);
  assertStrictEquals(isChar32("\uD800\uDFFF"), true);
  assertStrictEquals(isChar32("\uDFFF\uD800"), false);

  assertStrictEquals(isChar32(1 as unknown as string), false);
  assertStrictEquals(isChar32(null as unknown as string), false);
});
