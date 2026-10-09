import { assertStrictEquals, assertThrows } from "@std/assert";
import { Numerics } from "../../../../src/mod.mts";

Deno.test("Numerics.BigUint128.truncateFrom()", () => {
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(-1n),
    0xFFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(Numerics.BigUint128.truncateFrom(0n), 0n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(64n), 64n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(65n), 65n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(128n), 128n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(129n), 129n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(256n), 256n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(257n), 257n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(512n), 512n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(513n), 513n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(65535n), 65535n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(65536n), 65536n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(65537n), 65537n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(131071n), 131071n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(131072n), 131072n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(16777215n), 16777215n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(16777216n), 16777216n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(33554431n), 33554431n);
  assertStrictEquals(Numerics.BigUint128.truncateFrom(33554432n), 33554432n);
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(4294967295n),
    4294967295n,
  );
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(4294967296n),
    4294967296n,
  );
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(8589934591n),
    8589934591n,
  );
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(8589934592n),
    8589934592n,
  );
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(0xFFFF_FFFF_FFFF_FFFFn),
    0xFFFF_FFFF_FFFF_FFFFn,
  );
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(0x1_0000_0000_0000_0000n),
    0x1_0000_0000_0000_0000n,
  );
  assertStrictEquals(
    Numerics.BigUint128.truncateFrom(
      0x1_0000_0000_0000_0000_0000_0000_0000_0000n,
    ),
    0n,
  );

  assertThrows(
    () => {
      Numerics.BigUint128.truncateFrom(0 as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
  assertThrows(
    () => {
      Numerics.BigUint128.truncateFrom("1" as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
  assertThrows(
    () => {
      Numerics.BigUint128.truncateFrom(undefined as unknown as bigint);
    },
    TypeError,
    "Input must be a `bigint`",
  );
});
