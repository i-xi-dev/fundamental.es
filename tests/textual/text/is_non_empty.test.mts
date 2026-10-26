import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { Text } = Textuals;

Deno.test("Textuals.Text.isNonEmpty()", () => {
  assertStrictEquals(Text.isNonEmpty(""), false);
  assertStrictEquals(Text.isNonEmpty("1"), true);
  assertStrictEquals(Text.isNonEmpty("11"), true);

  assertStrictEquals(Text.isNonEmpty(1 as unknown as string), false);
  assertStrictEquals(Text.isNonEmpty(null as unknown as string), false);
  assertStrictEquals(Text.isNonEmpty(undefined as unknown as string), false);
});
