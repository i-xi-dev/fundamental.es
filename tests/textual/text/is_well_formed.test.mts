import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Text } = Textuals;

Deno.test("Textuals.Text.isWellFormed()", () => {
  assertStrictEquals(Text.isWellFormed(""), true);
  assertStrictEquals(Text.isWellFormed("1"), true);
  assertStrictEquals(Text.isWellFormed("11"), true);
  assertStrictEquals(Text.isWellFormed("1\uD800\uDC001"), true);
  assertStrictEquals(Text.isWellFormed("1\uDC00\uD8001"), false);
  assertStrictEquals(Text.isWellFormed("1\uDC001"), false);
  assertStrictEquals(Text.isWellFormed("1\uD8001"), false);

  assertStrictEquals(Text.isWellFormed(1 as unknown as string), false);
  assertStrictEquals(Text.isWellFormed(null as unknown as string), false);
  assertStrictEquals(Text.isWellFormed(undefined as unknown as string), false);
});
