import { assertStrictEquals } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

Deno.test("Textuals.CodePoint.is()", () => {
  assertStrictEquals(Textuals.CodePoint.is(-1), false);
  assertStrictEquals(Textuals.CodePoint.is(0), true);
  assertStrictEquals(Textuals.CodePoint.is(0xFFFF), true);
  assertStrictEquals(Textuals.CodePoint.is(0x10FFFF), true);
  assertStrictEquals(Textuals.CodePoint.is(0x110000), false);

  assertStrictEquals(Textuals.CodePoint.is("1" as unknown as number), false);
  assertStrictEquals(
    Textuals.CodePoint.is(undefined as unknown as number),
    false,
  );
});
