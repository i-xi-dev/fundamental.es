import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

function testAnd(a: number, b: number) {
  return Numerics.Uint24.bitwiseAnd(a, b);
}

Deno.test("Numerics.Uint24.bitwiseAnd()", () => {
  assertStrictEquals(testAnd(0b0000_00, 0b0000_00), 0b0000_00);
  assertStrictEquals(testAnd(0b1111_11, 0b1111_11), 0b1111_11);
  assertStrictEquals(testAnd(0b0000_00, 0b1111_11), 0b0000_00);
  assertStrictEquals(testAnd(0b1111_11, 0b0000_00), 0b0000_00);

  assertStrictEquals(testAnd(0b1000_00, 0b1000_00), 0b1000_00);
  assertStrictEquals(testAnd(0b0000_01, 0b1000_00), 0b0000_00);
  assertStrictEquals(testAnd(0b1000_00, 0b0000_01), 0b0000_00);
  assertStrictEquals(testAnd(0b0000_01, 0b0000_01), 0b0000_01);

  assertStrictEquals(testAnd(0b0000_000, 0b0000_000), 0b0000_000);
  assertStrictEquals(testAnd(0b1111_111, 0b1111_111), 0b1111_111);
  assertStrictEquals(testAnd(0b0000_000, 0b1111_111), 0b0000_000);
  assertStrictEquals(testAnd(0b1111_111, 0b0000_000), 0b0000_000);

  assertStrictEquals(testAnd(0b1000_000, 0b1000_000), 0b1000_000);
  assertStrictEquals(testAnd(0b0000_001, 0b1000_000), 0b0000_000);
  assertStrictEquals(testAnd(0b1000_000, 0b0000_001), 0b0000_000);
  assertStrictEquals(testAnd(0b0000_001, 0b0000_001), 0b0000_001);

  assertStrictEquals(testAnd(0b0000_0000, 0b0000_0000), 0b0000_0000);
  assertStrictEquals(testAnd(0b1111_1111, 0b1111_1111), 0b1111_1111);
  assertStrictEquals(testAnd(0b0000_0000, 0b1111_1111), 0b0000_0000);
  assertStrictEquals(testAnd(0b1111_1111, 0b0000_0000), 0b0000_0000);

  assertStrictEquals(testAnd(0b1000_0000, 0b1000_0000), 0b1000_0000);
  assertStrictEquals(testAnd(0b0000_0001, 0b1000_0000), 0b0000_0000);
  assertStrictEquals(testAnd(0b1000_0000, 0b0000_0001), 0b0000_0000);
  assertStrictEquals(testAnd(0b0000_0001, 0b0000_0001), 0b0000_0001);

  assertStrictEquals(
    testAnd(0b0000_0000_0000_0000, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(0b1111_1111_1111_1111, 0b1111_1111_1111_1111),
    0b1111_1111_1111_1111,
  );
  assertStrictEquals(
    testAnd(0b0000_0000_0000_0000, 0b1111_1111_1111_1111),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(0b1111_1111_1111_1111, 0b0000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );

  assertStrictEquals(
    testAnd(0b1000_0000_0000_0000, 0b1000_0000_0000_0000),
    0b1000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(0b0000_0000_0000_0001, 0b1000_0000_0000_0000),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(0b1000_0000_0000_0000, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(0b0000_0000_0000_0001, 0b0000_0000_0000_0001),
    0b0000_0000_0000_0001,
  );

  assertStrictEquals(
    testAnd(
      0b0000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(
      0b1111_1111_1111_1111_1111_1111,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b1111_1111_1111_1111_1111_1111,
  );
  assertStrictEquals(
    testAnd(
      0b0000_0000_0000_0000_0000_0000,
      0b1111_1111_1111_1111_1111_1111,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(
      0b1111_1111_1111_1111_1111_1111,
      0b0000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );

  assertStrictEquals(
    testAnd(
      0b1000_0000_0000_0000_0000_0000,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b1000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(
      0b0000_0000_0000_0000_0000_0001,
      0b1000_0000_0000_0000_0000_0000,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(
      0b1000_0000_0000_0000_0000_0000,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0000,
  );
  assertStrictEquals(
    testAnd(
      0b0000_0000_0000_0000_0000_0001,
      0b0000_0000_0000_0000_0000_0001,
    ),
    0b0000_0000_0000_0000_0000_0001,
  );
});

Deno.test("Numerics.Uint24.bitwiseAnd() - error", () => {
  assertThrows(
    () => {
      testAnd(-1, 0);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testAnd(0, -1);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      testAnd(0x1000000, 0);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );
  assertThrows(
    () => {
      testAnd(0, 0x1000000);
    },
    TypeError,
    "Input must be a 24-bit unsigned integer of type `number`",
  );
});
