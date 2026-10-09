import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testOr(a: number, b: number) {
  return Numerics.Uint24.bitwiseOr(a, b);
}

Deno.test("Numerics.Uint24.bitwiseOr()", () => {
  assertStrictEquals(testOr(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(testOr(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(testOr(0b0000_00, 0b1111_11), 0b1111_11);
  assertStrictEquals(testOr(0b1111_11, 0b0000_00), 0b1111_11);

  assertStrictEquals(testOr(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(testOr(0b0000_01, 0b1000_00), 0b1000_01);
  assertStrictEquals(testOr(0b1000_00, 0b0000_01), 0b1000_01);
  assertStrictEquals(testOr(0b0000_01, 0b0000_01), 0b0000_01);

  assertStrictEquals(testOr(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(testOr(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(testOr(0b0000_000, 0b1111_111), 0b1111_111);
  assertStrictEquals(testOr(0b1111_111, 0b0000_000), 0b1111_111);

  assertStrictEquals(testOr(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(testOr(0b0000_001, 0b1000_000), 0b1000_001);
  assertStrictEquals(testOr(0b1000_000, 0b0000_001), 0b1000_001);
  assertStrictEquals(testOr(0b0000_001, 0b0000_001), 0b0000_001);

  assertStrictEquals(testOr(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(testOr(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(testOr(0b0000_0000, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(testOr(0b1111_1111, 0b0000_0000), 0b1111_1111);

  assertStrictEquals(testOr(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(testOr(0b0000_0001, 0b1000_0000), 0b1000_0001);
  assertStrictEquals(testOr(0b1000_0000, 0b0000_0001), 0b1000_0001);
  assertStrictEquals(testOr(0b0000_0001, 0b0000_0001), 0b0000_0001);

  assertStrictEquals(
    testOr(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    testOr(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    testOr(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    testOr(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b1111_1111_1111_1111,
  );

  assertStrictEquals(
    testOr(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0000,
  );
  assertStrictEquals(
    testOr(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    testOr(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b1000_0000_0000_0001,
  );
  assertStrictEquals(
    testOr(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0001,
  );

  assertStrictEquals(
    testOr(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    testOr(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    testOr(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    testOr(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );

  assertStrictEquals(
    testOr(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    testOr(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    testOr(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b1000_0000_0000_0000_0000_0001,
  );
  assertStrictEquals(
    testOr(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0001,
  );
});

Deno.test("Numerics.Uint24.bitwiseOr() - error", () => {
  assertThrows(
    () => {
      testOr(-1, 0);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testOr(0, -1);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testOr(0x1000000, 0);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testOr(0, 0x1000000);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );
});
