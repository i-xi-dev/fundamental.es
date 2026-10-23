import { assertStrictEquals, assertThrows } from "@std/assert";
import { Textuals } from "../../../src/mod.mts";

const { CodePointRange } = Textuals;

Deno.test("Textuals.CodePointRange.fromPlane()", () => {
  const p0 = CodePointRange.fromPlane(0);
  assertStrictEquals(p0.min, 0);
  assertStrictEquals(p0.max, 0xFFFF);

  const p1 = CodePointRange.fromPlane(1);
  assertStrictEquals(p1.min, 0x10000);
  assertStrictEquals(p1.max, 0x1FFFF);

  const p2 = CodePointRange.fromPlane(2);
  assertStrictEquals(p2.min, 0x20000);
  assertStrictEquals(p2.max, 0x2FFFF);

  const p3 = CodePointRange.fromPlane(3);
  assertStrictEquals(p3.min, 0x30000);
  assertStrictEquals(p3.max, 0x3FFFF);

  const p4 = CodePointRange.fromPlane(4);
  assertStrictEquals(p4.min, 0x40000);
  assertStrictEquals(p4.max, 0x4FFFF);

  const p5 = CodePointRange.fromPlane(5);
  assertStrictEquals(p5.min, 0x50000);
  assertStrictEquals(p5.max, 0x5FFFF);

  const p6 = CodePointRange.fromPlane(6);
  assertStrictEquals(p6.min, 0x60000);
  assertStrictEquals(p6.max, 0x6FFFF);

  const p7 = CodePointRange.fromPlane(7);
  assertStrictEquals(p7.min, 0x70000);
  assertStrictEquals(p7.max, 0x7FFFF);

  const p8 = CodePointRange.fromPlane(8);
  assertStrictEquals(p8.min, 0x80000);
  assertStrictEquals(p8.max, 0x8FFFF);

  const p9 = CodePointRange.fromPlane(9);
  assertStrictEquals(p9.min, 0x90000);
  assertStrictEquals(p9.max, 0x9FFFF);

  const p10 = CodePointRange.fromPlane(10);
  assertStrictEquals(p10.min, 0xA0000);
  assertStrictEquals(p10.max, 0xAFFFF);

  const p11 = CodePointRange.fromPlane(11);
  assertStrictEquals(p11.min, 0xB0000);
  assertStrictEquals(p11.max, 0xBFFFF);

  const p12 = CodePointRange.fromPlane(12);
  assertStrictEquals(p12.min, 0xC0000);
  assertStrictEquals(p12.max, 0xCFFFF);

  const p13 = CodePointRange.fromPlane(13);
  assertStrictEquals(p13.min, 0xD0000);
  assertStrictEquals(p13.max, 0xDFFFF);

  const p14 = CodePointRange.fromPlane(14);
  assertStrictEquals(p14.min, 0xE0000);
  assertStrictEquals(p14.max, 0xEFFFF);

  const p15 = CodePointRange.fromPlane(15);
  assertStrictEquals(p15.min, 0xF0000);
  assertStrictEquals(p15.max, 0xFFFFF);

  const p16 = CodePointRange.fromPlane(16);
  assertStrictEquals(p16.min, 0x100000);
  assertStrictEquals(p16.max, 0x10FFFF);

  assertThrows(
    () => {
      CodePointRange.fromPlane(-1 as 0);
    },
    TypeError,
    "Input must be a Unicode plane of type `number`",
  );

  assertThrows(
    () => {
      CodePointRange.fromPlane(17 as 0);
    },
    TypeError,
    "Input must be a Unicode plane of type `number`",
  );

  assertThrows(
    () => {
      CodePointRange.fromPlane("0" as unknown as 0);
    },
    TypeError,
    "Input must be a Unicode plane of type `number`",
  );
});
