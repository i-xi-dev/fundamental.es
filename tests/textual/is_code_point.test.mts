import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../src/mod.mts";

const { isCodePoint } = Textuals;

Deno.test("Textuals.isCodePoint()", () => {
  assertStrictEquals(isCodePoint(-1), false);
  assertStrictEquals(isCodePoint(0), true);
  assertStrictEquals(isCodePoint(0xFFFF), true);
  assertStrictEquals(isCodePoint(0x10FFFF), true);
  assertStrictEquals(isCodePoint(0x110000), false);

  assertStrictEquals(isCodePoint("1" as unknown as number), false);
  assertStrictEquals(
    isCodePoint(undefined as unknown as number),
    false,
  );
});
