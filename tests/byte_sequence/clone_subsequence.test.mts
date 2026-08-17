import {
  assertNotStrictEquals,
  assertStrictEquals,
  assertThrows,
} from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.cloneSubsequence() - size0", () => {
  const bs0 = ByteSequence.create(0);

  const bs0a = bs0.cloneSubsequence();
  assertStrictEquals(bs0a.count, 0);
  assertNotStrictEquals(bs0a.toArrayBuffer(), bs0.toArrayBuffer());
  assertStrictEquals(bs0a.toHexEncoded(), bs0.toHexEncoded());

  const bs0b = bs0.cloneSubsequence(0);
  assertStrictEquals(bs0b.count, 0);

  const bs0c = bs0.cloneSubsequence(0, 0);
  assertStrictEquals(bs0c.count, 0);

  assertThrows(
    () => {
      bs0.cloneSubsequence(-1);
    },
    RangeError,
    "Start index must be 0 or greater",
  );

  assertThrows(
    () => {
      bs0.cloneSubsequence(1);
    },
    RangeError,
    "Start index must be 0 or less",
  );

  assertThrows(
    () => {
      bs0.cloneSubsequence(0, -1);
    },
    RangeError,
    "End index must be 0 or greater",
  );

  assertThrows(
    () => {
      bs0.cloneSubsequence(0, 1);
    },
    RangeError,
    "End index must be 0 or less",
  );
});

Deno.test("ByteSequence.prototype.cloneSubsequence()", () => {
  const bs0 = ByteSequence.fromHexEncoded("FF");

  const bs0a = bs0.cloneSubsequence();
  assertStrictEquals(bs0a.count, 1);
  assertStrictEquals(bs0a.toArray()[0], 0xFF);
  assertStrictEquals(bs0a.toHexEncoded(), bs0.toHexEncoded());

  const bs0b = bs0.cloneSubsequence(0);
  assertStrictEquals(bs0b.count, 1);
  assertStrictEquals(bs0b.toArray()[0], 0xFF);

  const bs0c = bs0.cloneSubsequence(0, 0);
  assertStrictEquals(bs0c.count, 0);

  const bs0d = bs0.cloneSubsequence(0, 1);
  assertStrictEquals(bs0d.count, 1);
  assertStrictEquals(bs0d.toArray()[0], 0xFF);

  const bs0e = bs0.cloneSubsequence(1, 1);
  assertStrictEquals(bs0e.count, 0);

  assertThrows(
    () => {
      bs0.cloneSubsequence(2);
    },
    RangeError,
    "Start index must be 1 or less",
  );

  assertThrows(
    () => {
      bs0.cloneSubsequence(0, 2);
    },
    RangeError,
    "End index must be 1 or less",
  );

  assertThrows(
    () => {
      bs0.cloneSubsequence(1, 0);
    },
    RangeError,
    "The upper limit of the range must be greater than or equal to the lower limit",
  );

  assertThrows(
    () => {
      bs0.cloneSubsequence("1" as unknown as number);
    },
    TypeError,
    "Start index must be a safe-integer of type `number`",
  );

  assertThrows(
    () => {
      bs0.cloneSubsequence(0, "1" as unknown as number);
    },
    TypeError,
    "End index must be a safe-integer of type `number`",
  );

  const bs1 = ByteSequence.random(1000);
  const bs1x = bs1.cloneSubsequence(100, 200);

  assertStrictEquals(
    bs1x.toHexEncoded(),
    bs1.toBytes().subarray(100, 200).toHex(),
  );
});
