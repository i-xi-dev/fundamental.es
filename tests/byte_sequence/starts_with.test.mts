import { assertStrictEquals } from "@std/assert";
import { ByteSequence } from "../../src/mod.mts";

Deno.test("ByteSequence.prototype.startsWith() - ByteSequence", () => {
  const bs0 = ByteSequence.create(64);
  const bs0b = ByteSequence.create(64);

  const bs1 = ByteSequence.fromBytes(Uint8Array.of(255, 0, 127, 1));
  const bs1b = ByteSequence.fromArray([255, 0, 127, 1]);

  assertStrictEquals(bs0.startsWith(bs0), true);
  assertStrictEquals(bs0.startsWith(bs0b), true);

  assertStrictEquals(bs1.startsWith(bs1), true);
  assertStrictEquals(bs1.startsWith(bs1b), true);
  assertStrictEquals(bs1.startsWith(bs0), true);
  assertStrictEquals(bs0.startsWith(bs1), false);
});

Deno.test("ByteSequence.prototype.startsWith() - ArrayBufferView", () => {
  const bs0 = ByteSequence.create(0);

  const bs1 = ByteSequence.fromBytes(Uint8Array.of(255, 0, 127, 1));

  assertStrictEquals(bs0.startsWith(new Uint8Array(0)), true);
  assertStrictEquals(bs1.startsWith(bs1.toBytes()), true);
  assertStrictEquals(bs1.startsWith(Uint8Array.of(255, 0, 127, 1)), true);
  assertStrictEquals(
    bs1.startsWith(new Uint16Array(Uint8Array.of(255, 0, 127, 1).buffer)),
    true,
  );

  assertStrictEquals(bs1.startsWith(Uint8Array.of(255, 0, 123, 1)), false);
  assertStrictEquals(bs1.startsWith(Uint8Array.of(255, 0, 127, 1, 5)), false);
  assertStrictEquals(bs1.startsWith(Uint8Array.of(255, 0, 127)), true);

  assertStrictEquals(bs1.startsWith([255, 0, 127, 2]), false);
  assertStrictEquals(bs1.startsWith([255, 0, 127, 1, 2]), false);
  assertStrictEquals(bs1.startsWith([255, 0, 127]), true);
  assertStrictEquals(bs1.startsWith([255, 0]), true);
  assertStrictEquals(bs1.startsWith([255]), true);
  assertStrictEquals(bs1.startsWith([]), true);
});

Deno.test("ByteSequence.prototype.startsWith() - Array<number>", () => {
  const bs0 = ByteSequence.create(0);

  const bs1 = ByteSequence.fromBytes(Uint8Array.of(255, 0, 127, 1));

  assertStrictEquals(bs0.startsWith([]), true);
  assertStrictEquals(bs1.startsWith(bs1.toArray()), true);
  assertStrictEquals(bs1.startsWith([255, 0, 127, 1]), true);

  assertStrictEquals(bs1.startsWith([255, 0, 127, 2]), false);
  assertStrictEquals(bs1.startsWith([255, 0, 127, 1, 2]), false);
  assertStrictEquals(bs1.startsWith([255, 0, 127]), true);
});

Deno.test("ByteSequence.prototype.startsWith() - ArrayBuffer", () => {
  const bs0 = ByteSequence.create(0);

  const bs1 = ByteSequence.fromBytes(Uint8Array.of(255, 0, 127, 1));
  const bs1b = ByteSequence.fromArray([255, 0, 127, 1]);

  assertStrictEquals(bs0.startsWith(bs0.toArrayBuffer()), true);
  assertStrictEquals(bs1.startsWith(bs1b.toArrayBuffer()), true);
  assertStrictEquals(bs1.startsWith(bs0.toArrayBuffer()), true);
});

// Deno.test("ByteSequence.prototype.startsWith(*)", () => {
//   const bs0 = ByteSequence.allocate(0);

//   const bs1 = ByteSequence.fromArrayBufferView(Uint8Array.of(255, 0, 127, 1));

//   assertThrows(
//     () => {
//       bs0.startsWith(null as unknown as Uint8Array);
//     },
//     TypeError,
//     "otherBytes",
//   );

//   assertThrows(
//     () => {
//       bs0.startsWith(undefined as unknown as Uint8Array);
//     },
//     TypeError,
//     "otherBytes",
//   );

//   assertThrows(
//     () => {
//       bs1.startsWith(["255"] as unknown as Uint8Array);
//     },
//     TypeError,
//     "otherBytes",
//   );
// });
