import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

Deno.test("Textuals.Text.isNonEmpty()", () => {
  assertStrictEquals(Textuals.Text.isNonEmpty(""), false);
  assertStrictEquals(Textuals.Text.isNonEmpty("1"), true);
  assertStrictEquals(Textuals.Text.isNonEmpty("11"), true);

  assertStrictEquals(Textuals.Text.isNonEmpty(1), false);
  assertStrictEquals(Textuals.Text.isNonEmpty(null), false);
  assertStrictEquals(Textuals.Text.isNonEmpty(undefined), false);
});
