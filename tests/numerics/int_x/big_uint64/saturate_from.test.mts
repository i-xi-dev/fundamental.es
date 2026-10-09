import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.BigUint64.saturateFrom()", () => {
  assertStrictEquals(Numerics.BigUint64.saturateFrom(0n), 0n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(1n), 1n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(63n), 63n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(64n), 64n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(127n), 127n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(128n), 128n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(255n), 255n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(256n), 256n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(65535n), 65535n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(65536n), 65536n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(16777215n), 16777215n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(16777216n), 16777216n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(4294967295n), 4294967295n);
  assertStrictEquals(Numerics.BigUint64.saturateFrom(4294967296n), 4294967296n);
  assertStrictEquals(
    Numerics.BigUint64.saturateFrom(281474976710655n),
    281474976710655n,
  );
  assertStrictEquals(
    Numerics.BigUint64.saturateFrom(281474976710656n),
    281474976710656n,
  );
  assertStrictEquals(
    Numerics.BigUint64.saturateFrom(0xFFFF_FFFF_FFFF_FFFFn),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(
    Numerics.BigUint64.saturateFrom(0x1_0000_0000_0000_0000n),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(Numerics.BigUint64.saturateFrom(-1n), 0n);

  assertStrictEquals(
    Numerics.BigUint64.saturateFrom(BigInt(Number.MIN_SAFE_INTEGER)),
    0n,
  );
  assertStrictEquals(
    Numerics.BigUint64.saturateFrom(BigInt(Number.MAX_SAFE_INTEGER)),
    BigInt(Number.MAX_SAFE_INTEGER),
  );

  assertThrows(
    () => {
      Numerics.BigUint64.saturateFrom(0 as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
  assertThrows(
    () => {
      Numerics.BigUint64.saturateFrom("1" as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
  assertThrows(
    () => {
      Numerics.BigUint64.saturateFrom(undefined as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
});
