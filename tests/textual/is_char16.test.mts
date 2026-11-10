import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

const { isChar16 } = Textuals;

Deno.test("Textuals.isChar16()", () => {
  assertStrictEquals(isChar16(""), false);
  assertStrictEquals(isChar16("\u0000"), true);
  assertStrictEquals(isChar16("1"), true);
  assertStrictEquals(isChar16("11"), false);
  assertStrictEquals(isChar16("\uFFFF"), true);
  assertStrictEquals(isChar16("\u{10000}"), false);
  assertStrictEquals(isChar16("\u{10000}\u{10000}"), false);
  assertStrictEquals(isChar16("\uD800"), true);
  assertStrictEquals(isChar16("\uDFFF"), true);
  assertStrictEquals(isChar16("\uD800\uDFFF"), false);
  assertStrictEquals(isChar16("\uDFFF\uD800"), false);

  assertStrictEquals(isChar16(1 as unknown as string), false);
  assertStrictEquals(isChar16(null as unknown as string), false);
});
